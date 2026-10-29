
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = [
    "All",
    "Fashion",
    "Shoes",
    "Electronics",
    "Home",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const category = searchParams.get("category") || "All";
    setSelectedCategory(category);
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:3001/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid product data.");
        }

        setApiProducts(data);
      } catch {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const savedProducts = JSON.parse(
    
    localStorage.getItem("addedProducts") || "[]"
  );
  console.log("LocalStorage Products:", savedProducts);

  const apiProductIds = new Set(
    apiProducts.map((product) => String(product.id))
  );

  const localProducts = products.filter(
    (product) => !apiProductIds.has(String(product.id))
  );

  const allProducts = [
    ...apiProducts,
    ...localProducts,
    ...(Array.isArray(savedProducts) ? savedProducts : []),
  ];

  const filteredProducts = allProducts.filter((product) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch = [
      product.name,
      product.title,
      product.category,
      product.subCategory,
    ].some((value) =>
      String(value || "").toLowerCase().includes(search)
    );

    return matchesCategory && matchesSearch;
  });

  function handleCategoryClick(category) {
    setSelectedCategory(category);

    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }

  return (
    <div className="products-page">
      <section className="products-header">
        <p>OUR COLLECTION</p>
        <h1>
          {selectedCategory === "All"
            ? "All Products"
            : selectedCategory === "Home"
            ? "Home & Living"
            : selectedCategory}
        </h1>
        <span>Find the perfect products for you</span>
      </section>

      <div className="product-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm("")}>Clear</button>
      </div>

      <div className="products-layout">
        <aside className="category-sidebar">
          <h2>Categories</h2>

          <div className="sidebar-category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category ? "active" : ""
                }
                onClick={() => handleCategoryClick(category)}
              >
                {category === "All"
                  ? "All Products"
                  : category === "Home"
                  ? "Home & Living"
                  : category}
                <span>›</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="products-content">
          <div className="products-count">
            <h2>
              {selectedCategory === "All"
                ? "Explore Products"
                : selectedCategory === "Home"
                ? "Home & Living"
                : selectedCategory}
            </h2>
            {!loading && !error && (
              <span>{filteredProducts.length} products</span>
            )}
          </div>

          {loading ? (
            <div className="loading-message">
              <h2>Loading products...</h2>
              <p>Please wait while we fetch the products.</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <div className="error-card">
                <h2>Oops! Something Went Wrong</h2>
                <p>{error}</p>
                <button
                  className="error-retry-btn"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="all-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={`${product.id}-${product.name || product.title}`}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h2>No Products Found</h2>
              <p>
                We couldn't find products matching your search.
                Try another name or category.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  handleCategoryClick("All");
                }}
              >
                Show All Products
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;
