
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "../components/BackButton";


function AddProduct() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode = Boolean(editId);

  const initialForm = {
    name: "",
    description: "",
    category: "",
    price: "",
    oldPrice: "",
    rating: "5",
    quantity: "",
    image: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (!editId) return;

    async function fetchProduct() {
      try {
        const response = await fetch(
          `http://localhost:3001/products/${editId}`
        );

        if (!response.ok) {
          throw new Error("Product not found!");
        }

        const product = await response.json();

        setFormData({
          name: product.name || "",
          description: product.description || "",
          category: product.category || "",
          price: String(product.price ?? ""),
          oldPrice: String(product.oldPrice ?? ""),
          rating: String(product.rating ?? 5),
          quantity: String(product.quantity ?? ""),
          image: product.image || "",
          status: product.status || "Active",
          createdAt: product.createdAt || "",

        });
      } catch (error) {
        alert(error.message || "Unable to load product.");
        navigate("/admin");
      }
    }

    fetchProduct();
  }, [editId, navigate]);

  // Controlled form fields
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccessMessage("");
  }

  // Form validation
  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (formData.price.trim() === "") {
      newErrors.price = "Price is required.";
    } else if (
      !Number.isFinite(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Price must be greater than zero.";
    }

    if (formData.quantity.trim() === "") {
      newErrors.quantity = "Quantity is required.";
    } else if (
      !Number.isInteger(Number(formData.quantity)) ||
      Number(formData.quantity) < 0
    ) {
      newErrors.quantity =
        "Quantity must be a whole number and cannot be negative.";
    }


    if (!formData.image) {
      newErrors.image = "Please choose a product image.";
    }

    return newErrors;
  }



  // Form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

   const newProduct = {
  name: formData.name.trim(),
  description: formData.description.trim(),
  category: formData.category,
  price: Number(formData.price),
  oldPrice: Number(formData.oldPrice),
  quantity: Number(formData.quantity),
  rating: Number(formData.rating),
  image: formData.image,
  status: formData.status,
  reviews: 0,
  discount: 0,
  createdAt: isEditMode
    ? formData.createdAt
    : new Date().toISOString(),
};

    try {
      setErrors({});
      setSuccessMessage("");

      const response = await fetch(
        isEditMode
          ? `http://localhost:3001/products/${editId}`
          : "http://localhost:3001/products",
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isEditMode
              ? { ...newProduct, id: Number(editId) }
              : { ...newProduct, id: Date.now() }
          ),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to save product. Please try again.");
      }

      setSuccessMessage(
        isEditMode
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      setTimeout(() => {
        navigate("/admin");
      }, 800);
    } catch (error) {
      setErrors({
        form: error.message || "Something went wrong.",
      });
    }
  }

  // Reset form
  function handleReset() {
    setFormData(initialForm);
    setErrors({});
    setSuccessMessage("");
  }

  return (
    <div className="add-product-page">
       <BackButton fallback="/admin" />
      <div className="add-product-card">
        <h1>Add New Product</h1>
        <p className="form-subtitle">
          Enter product details below.
        </p>

        {successMessage && (
          <p className="success-message" role="status">
            {successMessage}
          </p>
        )}

        {errors.form && (
          <p className="error-message" role="alert">
            {errors.form}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="error-message">{errors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
            />
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="Fashion">Fashion</option>
              <option value="Shoes">Shoes</option>
              <option value="Electronics">Electronics</option>
              <option value="Home">Home</option>
            </select>
            {errors.category && (
              <p className="error-message">{errors.category}</p>
            )}
          </div>


          <div className="form-group">
            <label htmlFor="rating">Product Rating *</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
              <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
              <option value="3">⭐⭐⭐ (3 Stars)</option>
              <option value="2">⭐⭐ (2 Stars)</option>
              <option value="1">⭐ (1 Star)</option>
            </select>
          </div>


          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹) *</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0.01"
                step="any"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="error-message">{errors.price}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="oldPrice">Old Price (₹) *</label>
              <input
                id="oldPrice"
                name="oldPrice"
                type="number"
                min="0"
                step="any"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="Enter old price"
              />
            </div>


            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                step="1"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
              />
              {errors.quantity && (
                <p className="error-message">{errors.quantity}</p>
              )}
            </div>
          </div>

    
<div className="form-group">
  <label htmlFor="image">Product Image URL *</label>

  <input
    id="image"
    name="image"
    type="text"
    value={formData.image}
    onChange={handleChange}
    placeholder="Paste product image URL here"
  />

  {formData.image && (
    <img
      src={formData.image}
      alt="Product preview"
      style={{
        width: "150px",
        height: "150px",
        objectFit: "contain",
        marginTop: "10px",
      }}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
      onLoad={(e) => {
        e.currentTarget.style.display = "block";
      }}
    />
  )}

  {errors.image && (
    <p className="error-message">{errors.image}</p>
  )}
</div>


          <div className="form-group">
            <label htmlFor="status">Product Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {isEditMode ? "Update Product" : "Add Product"}
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
