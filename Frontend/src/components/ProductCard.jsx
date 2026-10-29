
import { Link, useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

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

  const addToCart = () => {
    if (String(product.status || "Active").toLowerCase() !== "active") {
      alert("This product is currently inactive.");
      return;
    }

    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingCart = Array.isArray(savedCart)
      ? savedCart
      : [];

    const existingProduct = existingCart.find(
      (item) => String(item.id) === String(product.id)
    );

    const currentQuantity = Number(existingProduct?.quantity || 0);
    const stock = Number(product.quantity ?? product.stock ?? 0);

    if (currentQuantity + 1 > stock) {
      alert(stock > 0
        ? `Only ${stock} items are available in stock.`
        : "This product is out of stock.");
      return;
    }

    const updatedCart = existingProduct
      ? existingCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: currentQuantity + 1 }
            : item
        )
      : [...existingCart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

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

    localStorage.setItem(
      "wishlist",
      JSON.stringify([...wishlist, product])
    );

    alert("Product added to Wishlist!");
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`} className="product-link">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="product-card-img"
            />
          ) : (
            <span className="product-emoji">
              {product.emoji || "🛍️"}
            </span>
          )}
        </Link>

        {discount > 0 && (
          <span className="discount">-{discount}%</span>
        )}

        <button
          type="button"
          className="wishlist-btn"
          onClick={addToWishlist}
          aria-label={`Add ${product.name} to Wishlist`}
        >
          ♡
        </button>
      </div>

      <div className="product-info">
        <Link
          to={`/product/${product.id}`}
          className="product-title-link"
        >
          <h3>{product.name}</h3>
        </Link>

        <div className="rating">
          ⭐ {product.rating ?? 0}
          <span> ({product.reviews ?? 0})</span>
        </div>

        <div className="price">
          <strong>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </strong>

          {oldPrice != null && Number(oldPrice) > Number(product.price) && (
            <del>
              ₹{Number(oldPrice).toLocaleString("en-IN")}
            </del>
          )}
        </div>

        <div className="product-card-actions">
          <Link
            to={`/product/${product.id}`}
            className="view-details-btn"
          >
            View Details
          </Link>

          <button
            type="button"
            className="add-to-cart-btn"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
