import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import GuestNavbar from "./GuestNavbar";

export default function Navbar() {
  const [hasToken, setHasToken] = useState(
    () => Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    // Catches login/logout from other tabs
    const onStorage = () => setHasToken(Boolean(localStorage.getItem("token")));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (hasToken) return <AdminNavbar />;
  return <GuestNavbar />;
}
