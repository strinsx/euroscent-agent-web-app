import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../constants/data";
import { useCart } from "./CartContext";

function getUser() {
  return localStorage.getItem("user") || "null";
}

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [user, setUser]           = useState(() => getUser());
  const { totalItems }            = useCart();
  const navigate                  = useNavigate();

  const isAdmin = Boolean(user);

  // Re-read user whenever storage changes (login/logout in another tab)
  useEffect(() => {
    const sync = () => setUser(getUser());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAdminOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="flex items-center justify-between px-6 md:px-12 h-16 bg-white/90 backdrop-blur-md border-b border-[#1f1f1f]/[0.06]">

          {/* Logo */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Link to="/" className="flex flex-col leading-none">
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#1f1f1f]/40"
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Euroscent</span>
              <span className="text-lg tracking-[0.08em] text-[#1f1f1f]"
                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>Agency Shop</span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link, i) => (
              <motion.div key={link} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}>
                <Link to={`/${link.toLowerCase()}`}
                  className="text-xs tracking-[0.2em] uppercase text-[#1f1f1f]/60 hover:text-[#1f1f1f] transition-colors duration-200"
                  style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400 }}>
                  {link}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button className="hidden md:block text-[#1f1f1f]/50 hover:text-[#1f1f1f] transition-colors" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Cart */}
            <Link to="/checkout" className="text-[#1f1f1f]/50 hover:text-[#1f1f1f] transition-colors relative" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#1f1f1f] text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Admin avatar + dropdown — only when token exists */}
            {isAdmin && (
              <div className="relative hidden md:block">
                <button onClick={() => setAdminOpen((v) => !v)} className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#1f1f1f] flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {(user?.username || "A")[0].toUpperCase()}
                    </span>
                  </div>
                  <motion.svg animate={{ rotate: adminOpen ? 180 : 0 }} transition={{ duration: 0.2 }}
                    width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1f1f1f" strokeWidth="2" opacity="0.4">
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {adminOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-3 w-52 bg-white border border-[#1f1f1f]/10 shadow-sm py-2 z-50">

                      <div className="px-4 py-3 border-b border-[#1f1f1f]/[0.06]">
                        <p className="text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/30"
                          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Signed in as</p>
                        <p className="text-xs text-[#1f1f1f] truncate mt-0.5"
                          style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>
                          {user || "Admin"}
                        </p>
                      </div>

                      <Link to="/create-listing" onClick={() => setAdminOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-[11px] tracking-[0.12em] uppercase text-[#1f1f1f]/60 hover:text-[#1f1f1f] hover:bg-[#1f1f1f]/[0.02] transition-colors"
                        style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Create Listing
                      </Link>

                      <Link to="/analytics" onClick={() => setAdminOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-[11px] tracking-[0.12em] uppercase text-[#1f1f1f]/60 hover:text-[#1f1f1f] hover:bg-[#1f1f1f]/[0.02] transition-colors"
                        style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                          <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        Dashboard
                      </Link>

                      <div className="border-t border-[#1f1f1f]/[0.06] mt-2 pt-2">
                        <button onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-[11px] tracking-[0.12em] uppercase text-[#1f1f1f]/35 hover:text-red-500 hover:bg-red-50 transition-colors"
                          style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Sign In link — only when no token */}
            {!isAdmin && (
              <Link to="/login"
                className="hidden md:block text-[10px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 hover:text-[#1f1f1f] transition-colors"
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400 }}>
                Sign In
              </Link>
            )}

            {/* Mobile hamburger */}
            <button className="md:hidden text-[#1f1f1f]" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-50 bg-white flex flex-col px-8 py-10"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex justify-between items-center mb-14">
              <span className="text-lg tracking-[0.08em] font-extrabold"
                style={{ fontFamily: "Manrope, sans-serif" }}>Agency Shop</span>
              <button onClick={() => setMenuOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link key={link} to={`/${link.toLowerCase()}`}
                  className="text-3xl font-extrabold tracking-tight text-[#1f1f1f]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  onClick={() => setMenuOpen(false)}>{link}</Link>
              ))}
              {isAdmin && (
                <>
                  <div className="w-8 h-px bg-[#1f1f1f]/10 my-2" />
                  <Link to="/create-listing"
                    className="text-2xl font-bold tracking-tight text-[#1f1f1f]/50"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                    onClick={() => setMenuOpen(false)}>Create Listing</Link>
                  <Link to="/analytics"
                    className="text-2xl font-bold tracking-tight text-[#1f1f1f]/50"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                    onClick={() => setMenuOpen(false)}>Dashboard</Link>
                  <button onClick={handleLogout}
                    className="text-left text-2xl font-bold tracking-tight text-red-400"
                    style={{ fontFamily: "Manrope, sans-serif" }}>Sign Out</button>
                </>
              )}
              {!isAdmin && (
                <Link to="/login"
                  className="text-2xl font-bold tracking-tight text-[#1f1f1f]/40"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  onClick={() => setMenuOpen(false)}>Sign In</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
