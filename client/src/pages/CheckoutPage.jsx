import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/GuestNavbar";
import Footer from "../components/Footer";

import { useCart } from "../components/CartContext";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
    delay,
  },
});

export default function CheckoutPage() {
  const navigate = useNavigate();

  const {
    items,
    subtotal,
    clearCart,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "cod",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.fullName.trim()) return setError("Full name is required.");
    if (!form.email.trim()) return setError("Email is required.");
    if (!form.phone.trim()) return setError("Phone number is required.");
    if (!form.address.trim()) return setError("Delivery address is required.");
    if (items.length === 0) return setError("Your cart is empty.");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.fullName,
          products: items.map((item) => ({
            productId: item._id || item.id,
            productName: item.name,   
            quantity: item.qty,
          })),
          totalPrice: subtotal,
          email: form.email,
          phone: form.phone,
          address: form.address,
          paymentMethod: form.paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to place order.");
      }

      clearCart();
      setPlaced(true);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── ORDER PLACED ──────────────────────────────────────────────────────────
  if (placed) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center px-8"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        <motion.div
          className="text-center max-w-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-14 h-14 border border-[#1f1f1f]/10 flex items-center justify-center mx-auto mb-8">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1f1f1f" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p
            className="text-[10px] tracking-[0.4em] uppercase text-[#1f1f1f]/30 mb-3"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            Order Submitted
          </p>

          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Thank you, {form.fullName.split(" ")[0]}!
          </h2>

          <p
            className="text-sm text-[#1f1f1f]/40 leading-relaxed mb-10"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            Your order has been placed. We'll get in touch with you at{" "}
            <span className="text-[#1f1f1f]/70">{form.email}</span> shortly.
          </p>

          <Link
            to="/collections"
            className="inline-block px-8 py-3.5 bg-[#1f1f1f] text-white text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  // ── EMPTY CART ────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        <Navbar />
        <div className="text-center">
          <p className="text-sm text-[#1f1f1f]/40 mb-6">
            Your cart is empty.
          </p>
          <Link
            to="/collections"
            className="text-xs tracking-[0.25em] uppercase underline underline-offset-4"
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  // ── MAIN CHECKOUT ─────────────────────────────────────────────────────────
  return (
    <div
      className="bg-white min-h-screen text-[#1f1f1f]"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-0 px-6 md:px-12">
        <nav
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#1f1f1f]/30"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
        >
          <Link to="/" className="hover:text-[#1f1f1f]/60 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1f1f1f]/60">Checkout</span>
        </nav>
      </div>

      <section className="px-6 md:px-12 py-14 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl">

        {/* LEFT — form */}
        <div className="flex flex-col gap-6">

          <motion.h1 {...fadeUp(0)} className="text-3xl font-bold tracking-tight">
            Order{" "}
            <span className="text-[#1f1f1f]/20 italic">Details</span>
          </motion.h1>

          {/* FULL NAME */}
          <motion.div {...fadeUp(0.06)}>
            <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2">
              Full Name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Juan dela Cruz"
              className="w-full border border-[#1f1f1f]/15 px-4 py-3 text-sm outline-none focus:border-[#1f1f1f]/40 transition-colors"
            />
          </motion.div>

          {/* EMAIL */}
          <motion.div {...fadeUp(0.1)}>
            <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="juan@email.com"
              className="w-full border border-[#1f1f1f]/15 px-4 py-3 text-sm outline-none focus:border-[#1f1f1f]/40 transition-colors"
            />
          </motion.div>

          {/* PHONE */}
          <motion.div {...fadeUp(0.14)}>
            <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="09XX XXX XXXX"
              className="w-full border border-[#1f1f1f]/15 px-4 py-3 text-sm outline-none focus:border-[#1f1f1f]/40 transition-colors"
            />
          </motion.div>

          {/* ADDRESS */}
          <motion.div {...fadeUp(0.17)}>
            <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2">
              Delivery Address
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House No., Street, Barangay, City, Province"
              className="w-full border border-[#1f1f1f]/15 px-4 py-3 text-sm outline-none focus:border-[#1f1f1f]/40 transition-colors"
            />
          </motion.div>

          {/* PAYMENT */}
          <motion.div {...fadeUp(0.18)}>
            <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-3">
              Payment Method
            </label>
            <div className="flex gap-3">
              {[
                { value: "cod", label: "Cash on Delivery" },
                { value: "gcash", label: "GCash" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setForm((p) => ({ ...p, paymentMethod: opt.value }))}
                  className={`flex-1 py-3 border text-xs tracking-[0.15em] uppercase transition-all duration-200 ${form.paymentMethod === opt.value
                      ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                      : "border-[#1f1f1f]/15 text-[#1f1f1f]/50 hover:border-[#1f1f1f]/40"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ERROR */}
          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          {/* SUBMIT */}
          <motion.button
            {...fadeUp(0.22)}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-[#1f1f1f] text-white text-xs tracking-[0.25em] uppercase hover:bg-[#1f1f1f]/80 transition-colors disabled:opacity-40 mt-2"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </motion.button>
        </div>

        {/* RIGHT — order summary */}
        <motion.div {...fadeUp(0.1)} className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight mb-8">
            Order{" "}
            <span className="text-[#1f1f1f]/20 italic">Summary</span>
          </h2>

          <div className="flex flex-col gap-4 mb-8">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-4 border-b border-[#1f1f1f]/[0.06]"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-[10px] text-[#1f1f1f]/35 mt-1">
                      {item.house && `${item.house} · `}{item.size}
                    </p>
                  </div>

                  {/* QUANTITY CONTROLLER */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.key)}
                      className="w-8 h-8 border border-[#1f1f1f]/15 flex items-center justify-center hover:border-[#1f1f1f]/40 transition"
                    >−</button>

                    <span className="min-w-[20px] text-center text-sm">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item.key)}
                      className="w-8 h-8 border border-[#1f1f1f]/15 flex items-center justify-center hover:border-[#1f1f1f]/40 transition"
                    >+</button>

                    <button
                      onClick={() => removeItem(item.key)}
                      className="ml-3 text-[10px] uppercase tracking-[0.2em] text-red-400 hover:text-red-500 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <span className="text-sm font-semibold">
                  ₱{(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* TOTALS */}
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex justify-between text-xs text-[#1f1f1f]/40">
              <span>Subtotal</span>
              <span>₱{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-[#1f1f1f]/40">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="w-full h-px bg-[#1f1f1f]/08 my-4" />

          <div className="flex justify-between items-baseline">
            <span className="text-xs tracking-[0.2em] uppercase text-[#1f1f1f]/40">
              Total
            </span>
            <span className="text-2xl font-bold tracking-tight">
              ₱{subtotal.toLocaleString()}
            </span>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}