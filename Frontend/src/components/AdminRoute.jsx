
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isAdminLoggedIn =
    localStorage.getItem("isAdminLoggedIn") === "true";

  return isAdminLoggedIn
    ? children
    : <Navigate to="/login" replace />;
}

export default AdminRoute;
