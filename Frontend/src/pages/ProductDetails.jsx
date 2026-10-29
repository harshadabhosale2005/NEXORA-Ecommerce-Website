
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import BackButton from "../components/BackButton";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `http://localhost:3001/products/${id}`
        );

        if (response.ok) {
          const apiProduct = await response.json();
          setProduct(apiProduct);
          return;
        }

        const savedProducts = JSON.parse(
          localStorage.getItem("addedProducts") || "[]"
        );

        const allProducts = [
          ...products,
          ...(Array.isArray(savedProducts) ? savedProducts : []),
        ];

        const foundProduct = allProducts.find(
          (item) => String(item.id) === String(id)
        );

        setProduct(foundProduct || null);
      } catch {
        const savedProducts = JSON.parse(
          localStorage.getItem("addedProducts") || "[]"
        );

        const allProducts = [
          ...products,
          ...(Array.isArray(savedProducts) ? savedProducts : []),
        ];

        const foundProduct = allProducts.find(
          (item) => String(item.id) === String(id)
        );

        setProduct(foundProduct || null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const addToWishlist = () => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const wishlist = Array.isArray(savedWishlist)
      ? savedWishlist
      : [];

    const alreadyAdded = wishlist.some(
      (item) => String(item.id) === String(product.id)
    );

    if (alreadyAdded) {
      alert("Product is already in your Wishlist!");
      return;
    }

    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Product added to Wishlist!");
  };

  if (loading) {
    return (
      <div className="product-not-found">
        <BackButton fallback="/products" />
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <BackButton fallback="/products" />
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }

  const stock = Number(product.quantity ?? product.stock ?? 0);
  const isActive =
    String(product.status || "Active").toLowerCase() === "active";

  const oldPrice = product.oldPrice ?? product.oldprice;

  const discount =
    product.discount ??
    (oldPrice && Number(oldPrice) > Number(product.price)
      ? Math.round(
          ((Number(oldPrice) - Number(product.price)) /
            Number(oldPrice)) *
            100
        )
      : 0);

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity((current) => current + 1);
    } else {
      alert("Only " + stock + " items are available in stock.");
    }
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = () => {
    if (!isActive) {
      alert("This product is currently inactive.");
      return;
    }

    if (stock < 1 || quantity > stock) {
      alert("This product is out of stock.");
      return;
    }

    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingCart = Array.isArray(savedCart) ? savedCart : [];

    const existingProduct = existingCart.find(
      (item) => String(item.id) === String(product.id)
    );

    const currentCartQuantity = Number(existingProduct?.quantity || 0);

    if (currentCartQuantity + quantity > stock) {
      alert("Available stock: " + stock);
      return;
    }

    const updatedCart = existingProduct
      ? existingCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: currentCartQuantity + quantity }
            : item
        )
      : [...existingCart, { ...product, quantity }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (!isActive) {
      alert("This product is currently inactive.");
      return;
    }

    if (stock < 1 || quantity > stock) {
      alert("This product is out of stock.");
      return;
    }

    navigate("/checkout", {
      state: {
        buyNowProduct: {
          ...product,
          quantity,
        },
      },
    });
  };

  return (
    <div className="product-details-page">
      <div className="details-info">
        <BackButton fallback="/products" />

        <p className="details-category">
          {product.category || "Uncategorized"}
        </p>

        <h1>{product.name}</h1>

        <div className="details-rating">
          ⭐ {product.rating ?? "Not rated"}
          <span> ({product.reviews ?? 0} Reviews)</span>
        </div>

        <div className="details-price">
          <strong>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </strong>

          {oldPrice != null &&
            Number(oldPrice) > Number(product.price) && (
              <del>
                ₹{Number(oldPrice).toLocaleString("en-IN")}
              </del>
            )}
        </div>

        <p className="details-description">
          {product.description || "No description available."}
        </p>

        <p>
          <strong>Availability: </strong>
          {stock > 0 ? `${stock} items in stock` : "Out of stock"}
        </p>

        <p>
          <strong>Status: </strong>
          <span className={isActive ? "status-active" : "status-inactive"}>
            {product.status || "Active"}
          </span>
        </p>

        <div className="quantity-section">
          <span>Quantity:</span>

          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            −
          </button>

          <strong>{quantity}</strong>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={!isActive || quantity >= stock}
          >
            +
          </button>
        </div>

        <div className="details-buttons">
          <button
            type="button"
            className="details-cart-btn"
            onClick={handleAddToCart}
            disabled={!isActive || stock < 1}
          >
            Add to Cart
          </button>

          <button
            type="button"
            className="details-wishlist-btn"
            onClick={addToWishlist}
          >
            Wishlist
          </button>

          <button
            type="button"
            className="details-buy-btn"
            onClick={handleBuyNow}
            disabled={!isActive || stock < 1}
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="details-image">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="details-product-img"
          />
        ) : (
          <span>{product.emoji || "🛍️"}</span>
        )}

        {discount > 0 && (
          <div className="details-discount">-{discount}%</div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
