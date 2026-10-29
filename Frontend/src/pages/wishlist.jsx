import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    setWishlist(Array.isArray(savedWishlist) ? savedWishlist : []);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (product) => String(product.id) !== String(id)
    );

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  const addToCart = (product) => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const cart = Array.isArray(savedCart) ? savedCart : [];

    const existingProduct = cart.find(
      (item) => String(item.id) === String(product.id)
    );

    const updatedCart = existingProduct
      ? cart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: (Number(item.quantity) || 1) + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  return (
    <div className="wishlist-page">
      <button
        type="button"
        className="back-btn"
        onClick={() => navigate("/products")}
      >
        ← Back
      </button>

      <h1>My Wishlist ♡</h1>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <h2>Your Wishlist is Empty</h2>
          <p>Add your favourite products using the heart icon.</p>
          <Link to="/products" className="view-details-btn">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div className="wishlist-card" key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="wishlist-image"
              >
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <span>{product.emoji || "🛍️"}</span>
                )}
              </Link>

              <p className="product-category">
                {product.category}
              </p>

              <h3>{product.name}</h3>

              <div className="wishlist-rating">
                ⭐ {product.rating ?? 0}
                <span> ({product.reviews ?? 0} Reviews)</span>
              </div>

              <div className="wishlist-price">
                <strong>₹{product.price}</strong>
                {product.oldPrice != null && (
                  <del>₹{product.oldPrice}</del>
                )}
              </div>

              <div className="wishlist-actions">
                <Link
                  to={`/product/${product.id}`}
                  className="view-details-btn"
                >
                  View Details
                </Link>

                <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  className="wishlist-remove-btn"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove ♡
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;