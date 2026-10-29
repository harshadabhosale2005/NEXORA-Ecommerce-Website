import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout() {

  
const navigate = useNavigate();
const location = useLocation();

const buyNowProduct = location.state?.buyNowProduct;

const [cart, setCart] = useState(() => {
  if (buyNowProduct) {
    return [buyNowProduct];
  }

  return JSON.parse(localStorage.getItem("cart") || "[]");
});


  const [formData, setFormData] = useState({
    
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

 


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

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


  const handlePlaceOrder = (e) => {

    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Basic validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all delivery details.");
      return;
    }

    // Save order
   const order = {
  id: Date.now(),
  customer: formData,
  products: cart,
  total: total,
  paymentMethod: paymentMethod,
  paymentStatus: "Pending",
  date: new Date().toLocaleString()
};

    localStorage.setItem(
      "latestOrder",
      JSON.stringify(order)
    );

    // Clear cart
 if (!buyNowProduct) {
  localStorage.removeItem("cart");
}

    // Go to success page
    navigate("/order-success");

  };


  if (cart.length === 0) {

    return (
      <div className="checkout-empty">

        <div>
          🛒
        </div>

        <h2>
          Your Cart is Empty
        </h2>

        <p>
          Add some products before checkout.
        </p>

        <button
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

      </div>
    );

  }


  return (

    <div className="checkout-page">

      {/* Header */}

      <section className="checkout-header">

        <p>
          CHECKOUT
        </p>

        <h1>
          Complete Your Order
        </h1>

        <span>
          Enter your delivery details
        </span>

      </section>


      {/* Main */}

      <div className="checkout-container">


        {/* Delivery Form */}

        <div className="delivery-section">

          <h2>
            📍 Delivery Address
          </h2>


          <form onSubmit={handlePlaceOrder}>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                placeholder="House No, Street, Area"
                value={formData.address}
                onChange={handleChange}
              />

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Payment */}

            <div className="payment-section">
  <h2>Payment Method</h2>

  <label className="payment-option">
    <input
      type="radio"
      name="paymentMethod"
      value="cod"
      checked={paymentMethod === "cod"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <span>Cash on Delivery</span>
  </label>

  <p>Pay when your order is delivered.</p>

  <label className="payment-option">
    <input
      type="radio"
      name="paymentMethod"
      value="online"
      checked={paymentMethod === "online"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <span>Online Payment (UPI / Card / Net Banking)</span>
  </label>

  {paymentMethod === "online" && (
    <p>
      Online payment gateway integration is required to complete
      your payment securely.
    </p>
  )}
</div>

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order
            </button>

          </form>

        </div>


        {/* Order Summary */}

        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>


          {cart.map((item) => (

            <div
              className="checkout-product"
              key={item.id}
            >

              
<div className="checkout-product-image">
  {item.image ? (
    <img
      src={item.image}
      alt={item.name}
      className="checkout-product-img"
    />
  ) : (
    <span>{item.emoji}</span>
  )}
</div>


              <div>

                <h4>
                  {item.name}
                </h4>

                <p>
                  Qty: {item.quantity}
                </p>

              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>

          ))}


          <hr />


          <div className="checkout-row">

            <span>
              Items
            </span>

            <span>
              {totalItems}
            </span>

          </div>


          <div className="checkout-row">

            <span>
              Delivery
            </span>

            <span className="free">
              FREE
            </span>

          </div>


          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total}
            </strong>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Checkout;