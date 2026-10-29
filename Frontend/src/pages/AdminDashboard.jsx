
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3001/products");

      if (!response.ok) {
        throw new Error("Unable to load products.");
      }

      const data = await response.json();
      console.log("Products received:", data);

      setSavedProducts(Array.isArray(data) ? data : []);
    } catch {
      setError(
        "Products load hot nahiyet. JSON Server chalu aahe ka te check kar."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3001/products/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Delete failed.");
      }

      setSavedProducts((currentProducts) =>
        currentProducts.filter(
          (product) => String(product.id) !== String(id)
        )
      );
    } catch {
      alert("Product delete zala nahi. JSON Server check kar.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "/login";
  };

  const activeProducts = savedProducts.filter(
    (product) =>
      String(product.status || "Active").toLowerCase() === "active"
  );

  const inactiveProducts = savedProducts.filter(
    (product) =>
      String(product.status || "Active").toLowerCase() !== "active"
  );

  

  const today = new Date().toISOString().slice(0, 10);

const recentlyAddedProducts = savedProducts.filter((product) => {
  if (!product.createdAt) return false;

  return new Date(product.createdAt).toISOString().slice(0, 10) === today;
});

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
  <div>
    <p className="admin-label">NEXORA ADMIN</p>
    <h1>Admin Dashboard</h1>
    <p>Manage your store products from one place.</p>
  </div>

  <div className="admin-header-actions">
    <Link to="/add-product" className="add-product-btn">
      + Add New Product
    </Link>

    <button
      type="button"
      onClick={handleLogout}
      className="delete-product-btn"
    >
      Logout
    </button>
  </div>
</div>
      <div className="admin-stats">
        <div className="admin-stat-card">
          <p>Total Products</p>
          <h2>{savedProducts.length}</h2>
        </div>

        <div className="admin-stat-card">
          <p>Active Products</p>
          <h2>{activeProducts.length}</h2>
        </div>

        <div className="admin-stat-card">
          <p>Inactive Products</p>
          <h2>{inactiveProducts.length}</h2>
        </div>
        <div className="admin-stat-card">
  <p>Recently Added Today</p>
  <h2>{recentlyAddedProducts.length}</h2>
</div>
      </div>

      <div className="admin-products-section">
        <h2>Product Management</h2>
        <p>Manage the products you have added.</p>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <div>
            <p>{error}</p>
            <button type="button" onClick={loadProducts}>
              Try Again
            </button>
          </div>
        ) : savedProducts.length === 0 ? (
          <p>No products added yet. Click "Add New Product".</p>
        ) : (
          <div className="admin-product-list">
            {savedProducts.map((product) => {
              const oldPrice = product.oldPrice ?? product.oldprice;

              return (
                <div className="admin-product-card" key={product.id}>
                  <div>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <div className="product-emoji">
                        {product.emoji || "🛍️"}
                      </div>
                    )}

                    <h3>{product.name}</h3>

                    <p>
                      <strong>Description:</strong>{" "}
                      {product.description || "No description added"}
                    </p>

                    <p>
                      <strong>Category:</strong>{" "}
                      {product.category || "Not specified"}
                    </p>

                    <p>
                      <strong>Price:</strong>{" "}
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </p>

                    {oldPrice != null && (
                      <p>
                        <strong>Old Price:</strong>{" "}
                        ₹{Number(oldPrice).toLocaleString("en-IN")}
                      </p>
                    )}

                    <p>
                      <strong>Quantity:</strong>{" "}
                      {product.quantity ?? 0}
                    </p>

                    <p>
                      <strong>Rating:</strong> ⭐ {product.rating ?? 0}
                    </p>

                    <span
                      className={
                        String(product.status || "Active").toLowerCase() ===
                        "active"
                          ? "product-status active"
                          : "product-status inactive"
                      }
                    >
                      {product.status || "Active"}
                    </span>
                  </div>

                  <div className="admin-product-actions">
                    <Link
                      to={`/add-product?id=${product.id}`}
                      className="edit-product-btn"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                      className="delete-product-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
