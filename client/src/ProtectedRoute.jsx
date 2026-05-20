import { Navigate, useLocation } from "react-router-dom";
import useAuth  from "../src/services/authService.js";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        state={{ from: location }}   // ← LoginPage can read this
        replace
      />
    );
  }

  return children;
}