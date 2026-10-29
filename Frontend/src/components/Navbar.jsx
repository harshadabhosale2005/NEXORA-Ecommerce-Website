import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Navbar() {
  const location = useLocation();
const [isAdmin, setIsAdmin] = useState(
  localStorage.getItem("isAdminLoggedIn") === "true"
);

useEffect(() => {
  setIsAdmin(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );
}, [location]);
  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
       <p> 🛍️NEXORA</p>   {/* next + aura */}
      </Link>




      {/* Navigation Links */}
      <div className="nav-links">

        <a href="/">
  <b>Home</b>
</a>

        

        <Link to="/products">
  <b>Categories</b>
</Link>

        <Link to="/cart">
          <b>Cart</b>
        </Link>

        <Link to="/wishlist">♡ Wishlist</Link>

       {isAdmin && (
  <Link to="/admin">
    <b>Admin Dashboard</b>
  </Link>
)}

      </div>


      {/* Login & Register */}
      <div className="nav-buttons">

        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/register" className="register-btn">
          Register
        </Link>

      </div>

      

    </nav>
  );
}

export default Navbar;