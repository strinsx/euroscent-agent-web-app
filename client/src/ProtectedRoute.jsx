import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../src/services/authService.js";

export default function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState({ loading: true, isAuthenticated: false });
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    useAuth()
      .then((result) => {
        if (!mounted) return;
        setAuthState({ loading: false, ...result });
      })
      .catch(() => {
        if (!mounted) return;
        setAuthState({ loading: false, isAuthenticated: false });
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (authState.loading) {
    return null;
  }

  if (!authState.isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}