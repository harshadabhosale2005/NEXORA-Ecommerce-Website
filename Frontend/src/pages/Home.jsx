
import { Link, useNavigate } from "react-router-dom";
import homeImg from "../assets/home-img.png";

function Home() {
   const navigate = useNavigate();
  const featuredProducts = [
    

{
  id: 5,
  name: "Premium Sneakers",
  category: "Shoes",
  image: "/images/Shoes.png",
  
  rating: "⭐⭐⭐⭐⭐",
  reviews: 124,
  price: "₹1,599",
  oldPrice: "₹1,999",
  discount: "-20%",
},

    {
      id: 9,
      name: "Wireless Headphones",
      category: "Electronics",
      image: "/images/Headphone1.png",
      rating: "⭐⭐⭐⭐⭐",
      reviews: 89,
      price: "₹2,499",
      oldPrice: "₹2,999",
      discount: "-15%",
    },
    {
      id: 10,
      name: "Smart Watch",
      category: "Electronics",
      image: "/images/Smart-Watch.png",
      rating: "⭐⭐⭐⭐⭐",
      reviews: 156,
      price: "₹2,999",
      oldPrice: "₹3,999",
      discount: "-25%",
    },
    {
  id: 17,
  name: "Stylish Backpack",
  category: "Fashion",
  image: "/images/Bag.png",
  rating: "⭐⭐⭐⭐",
  reviews: 72,
  price: "₹899",
  oldPrice: "₹999",
  discount: "-10%",
},
  ];

  
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="small-title">WELCOME TO NEXORA</p>

          <h1>
            Shop Smart.
            <br />
            Shop <span>Better.</span>
          </h1>

          <p className="hero-text">
            Discover amazing products at the best prices.
            Find everything you love, all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="shop-btn">
              Shop Now
            </Link>

            <Link to="/products" className="explore-btn">
              Explore Products
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <div className="shopping-circle">
            <img
              src={homeImg}
              alt="ShopEase Shopping"
              className="home-shopping-img"
            />
          </div>
        </div>
      </section>

      
<div className="category-container">
  {[
    {
      name: "Fashion",
      image: "/images/Fash-sym.png",
      description: "Latest styles & trends",
    },
    {
      name: "Electronics",
      image: "/images/Elect-sym.png",
      description: "Smart gadgets & devices",
    },
    {
      name: "Shoes",
      image: "/images/shoes-sym1.png",
      description: "Comfort & style",
    },
    {
      name: "Home",
      image: "/images/home-sym1.png",
      description: "Make your home better",
    },
  ].map((category) => (
    <Link
      key={category.name}
      to={`/products?category=${category.name}`}
      className="category-card"
    >
      <div className="category-icon">
        <img
          src={category.image}
          alt={category.name}
          className="category-photo"
        />
      </div>

      <h3>{category.name}</h3>
      <p>{category.description}</p>
    </Link>
  ))}
</div>


      <section className="featured-products">
        <div className="section-heading">
          <p>OUR PRODUCTS</p>
          <h2>Featured Products</h2>
          <span>Discover our most popular products</span>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div className="product-card" key={product.id}>
             <div className="product-image">
  {product.image ? (
    <img
      src={product.image}
      alt={product.name}
      className="product-card-img"
    />
  ) : (
    <span className="product-emoji">{product.emoji}</span>
  )}
  <span className="discount">{product.discount}</span>
</div>

              <div className="product-info">
                <p className="product-category">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <div className="rating">
                  {product.rating} <span>({product.reviews})</span>
                </div>

                <div className="price">
                  <strong>{product.price}</strong>
                  {product.oldPrice && <del>{product.oldPrice}</del>}
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="view-details-btn"
                >
                  View Details
                </Link>

               
<button
  type="button"
  className="buy-now-btn"
  onClick={() => {
    console.log("Buy Now clicked:", product.name);

    const price = Number(
      String(product.price).replace(/[₹,]/g, "")
    );

    navigate("/checkout", {
      state: {
        buyNowProduct: {
          ...product,
          price: price,
          quantity: 1,
        },
      },
    });
  }}
>
  Buy Now
</button>

              </div>
            </div>
          ))}
        </div>

        <div className="view-products">
          <Link to="/products">
            <button type="button">View All Products →</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;