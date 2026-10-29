import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/cart";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/login";
import AdminRoute from "./components/AdminRoute";
import Wishlist from "./pages/wishlist";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
    {<BrowserRouter>

      <Navbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />
        
<Route
  path="/add-product"
  element={
    <AdminRoute>
      <AddProduct />
    </AdminRoute>
  }
/>
<Route path="/wishlist" element={<Wishlist />} />

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>


         <Route path="/login" 
      element={<Login />} 
      />
      </Routes>
      
     

    </BrowserRouter>}
  </>
  );
}

export default App;