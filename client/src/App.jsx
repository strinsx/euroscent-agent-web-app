import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import ProtectedRoute from "./ProtectedRoute";

import HomePage from "./HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CollectionsPage from "./pages/CollectionPage";
import ProductDetailPage from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import CreateListingPage from "./pages/CreateListingPage";
import AnalyticsPage from "./pages/AnalyticsPage";


export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Admin — protected by auth guard */}
          <Route
            path="/create-listing"
            element={
              <ProtectedRoute>
                <CreateListingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          {/* Alias routes for user-facing nav links */}
          <Route path="/stores" element={<Navigate to="/collections" replace />} />
          <Route path="/journal" element={<Navigate to="/about" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}
