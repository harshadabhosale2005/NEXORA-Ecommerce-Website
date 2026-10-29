import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState([]);



  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);

  }, []);


  const updateQuantity = (id, change) => {

    const updatedCart = cart.map((item) => {

      if (item.id === id) {

        return {
          ...item,
          quantity: Math.max(
            1,
            item.quantity + change
          )
        };

      }

      return item;

    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };


  const removeItem = (id) => {

    const updatedCart =
      cart.filter((item) => item.id !== id);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  const addToWishlist = (product) => {
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
    alert("Product is already in Wishlist!");
    return;
  }

  const updatedWishlist = [...wishlist, product];

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );

  alert("Product added to Wishlist!");
};


  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  const totalItems = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );


  // Empty Cart
  if (cart.length === 0) {

    return (
      <div className="empty-cart">

        <div className="empty-cart-icon">
          🛒
        </div>

        <h2>
          Your Cart is Empty
        </h2>

        <p>
          Looks like you haven't added
          anything to your cart yet.
        </p>

        <Link
          to="/products"
          className="continue-shopping-btn"
        >
          Continue Shopping
        </Link>

      </div>
    );

  }


  return (

    <div className="cart-page">

      {/* Header */}

      <section className="cart-header">

        <p>
          SHOPPING CART
        </p>

        <h1>
          Your Cart
        </h1>

        <span>
          Review your selected products
        </span>

      </section>


      {/* Cart */}

      <div className="cart-container">

        {/* Products */}

        <div className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <div className="cart-item-image">
  {item.image ? (
    <img
      src={item.image}
      alt={item.name}
      className="cart-product-img"
    />
  ) : (
    <span>{item.emoji}</span>
  )}
</div>


              <div className="cart-item-info">

                <p>
                  {item.category}
                </p>

                <h3>
                  {item.name}
                </h3>

                <strong>
                  ₹{item.price}
                </strong>

              </div>


              <div className="cart-quantity">

                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      -1
                    )
                  }
                >
                  −
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      1
                    )
                  }
                >
                  +
                </button>

              </div>


              <div className="cart-item-total">

                ₹
                {item.price * item.quantity}

              </div>
              <button
  type="button"
  className="cart-wishlist-btn"
  onClick={() => addToWishlist(item)}
  title="Add to Wishlist"
>
  ♡
</button>


              <button
                className="remove-cart-btn"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                🗑️ Remove
              </button>

            </div>

          ))}

        </div>


        {/* Summary */}

        <div className="cart-summary">

          <h2>
            Order Summary
          </h2>


          <div className="summary-row">

            <span>
              Total Items
            </span>

            <span>
              {totalItems}
            </span>

          </div>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹{total}
            </span>

          </div>


          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span className="free">
              FREE
            </span>

          </div>


          <hr />


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total}
            </strong>

          </div>


       
{/* Checkout Button */}

<Link
  to="/checkout"
  className="checkout-btn"
>
  Proceed to Checkout
</Link>

 

          <Link
            to="/products"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Cart;