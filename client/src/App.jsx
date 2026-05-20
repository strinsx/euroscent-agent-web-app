import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateListingPage from './pages/CreateListingPage'
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/login"   element={<LoginPage />} />
        <Route path="/signup"  element={<SignUpPage />} />
   <Route path="create-listing" element={<CreateListingPage/>}></Route>

        {/* Future pages — uncomment as you build them */}
        {/* <Route path="/collections" element={<CollectionsPage />} /> */}
        {/* <Route path="/about"       element={<AboutPage />} />       */}
        {/* <Route path="/stores"      element={<StoresPage />} />      */}
        {/* <Route path="/analytics"     element={<AnalyticsPage />} />     */}
      </Routes>
    </BrowserRouter>
  );
}
