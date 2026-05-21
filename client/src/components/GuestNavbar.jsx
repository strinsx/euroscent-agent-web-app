import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { NAV_LINKS } from "../constants/data";
import { useCart } from "./CartContext";

export default function GuestNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // CART
  const { totalItems } = useCart();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="flex items-center justify-between px-6 md:px-12 h-16 bg-white/90 backdrop-blur-md border-b border-[#1f1f1f]/[0.06]">

          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="flex flex-col leading-none"
            >
              <span
                className="text-[11px] tracking-[0.4em] uppercase text-[#1f1f1f]/40"
                style={{
                  fontFamily:
                    "Roboto, sans-serif",
                  fontWeight: 300,
                }}
              >
                Euroscent
              </span>

              <span
                className="text-lg tracking-[0.08em] text-[#1f1f1f]"
                style={{
                  fontFamily:
                    "Manrope, sans-serif",
                  fontWeight: 800,
                }}
              >
                Agency Shop
              </span>
            </Link>
          </motion.div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link}
                initial={{
                  opacity: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    0.1 + i * 0.07,
                }}
              >
                <Link
                  to={`/${link.toLowerCase()}`}
                  className="text-xs tracking-[0.2em] uppercase text-[#1f1f1f]/60 hover:text-[#1f1f1f] transition-colors duration-200"
                  style={{
                    fontFamily:
                      "Roboto, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-5">

            {/* SEARCH */}
            <button
              className="hidden md:block text-[#1f1f1f]/50 hover:text-[#1f1f1f] transition-colors"
              aria-label="Search"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* CART */}
            <Link
              to="/checkout"
              className="text-[#1f1f1f]/50 hover:text-[#1f1f1f] transition-colors relative"
              aria-label="Cart"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />

                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                />

                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>

              {/* CART BADGE */}
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{
                    scale: 0.6,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] px-1 bg-[#1f1f1f] text-white text-[8px] rounded-full flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-[#1f1f1f]"
              onClick={() =>
                setMenuOpen(true)
              }
              aria-label="Open menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                />

                <line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                />

                <line
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                />
              </svg>
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col px-8 py-10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* MOBILE HEADER */}
            <div className="flex justify-between items-center mb-14">

              <span
                className="text-lg tracking-[0.08em] font-extrabold"
                style={{
                  fontFamily:
                    "Manrope, sans-serif",
                }}
              >
                Agency Shop
              </span>

              <button
                onClick={() =>
                  setMenuOpen(false)
                }
                aria-label="Close menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                  />

                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                  />
                </svg>
              </button>

            </div>

            {/* MOBILE LINKS */}
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="text-3xl font-extrabold tracking-tight text-[#1f1f1f]"
                  style={{
                    fontFamily:
                      "Manrope, sans-serif",
                  }}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {link}
                </Link>
              ))}
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}