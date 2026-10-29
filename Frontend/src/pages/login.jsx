
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo admin credentials
    if (
      email === "harshada@gmail.com" &&
      password === "@harshada"
    ) {
      localStorage.setItem("isAdminLoggedIn", "true");
navigate("/admin");
    } else {
      alert("Invalid Admin Email or Password!");
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <div className="admin-login-icon">🔐</div>

        <h2>Admin Login</h2>
        <p>Login to access the Admin Dashboard</p>

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
           autoComplete="off"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login as Admin</button>

        <button
          type="button"
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </form>
    </div>
  );
}

export default Login;
