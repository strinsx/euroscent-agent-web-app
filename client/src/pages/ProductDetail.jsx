import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/GuestNavbar";
import Footer from "../components/Footer";
import { PRODUCTS } from "../constants/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

function NoteTag({ label }) {
  return (
    <span className="px-3 py-1 border border-[#1f1f1f]/12 text-[10px] tracking-[0.15em] text-[#1f1f1f]/50"
      style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{label}</span>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = PRODUCTS.find((p) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? "50ml");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: "Manrope, sans-serif" }}>
        <div className="text-center">
          <p className="text-sm text-[#1f1f1f]/40 mb-6">Fragrance not found.</p>
          <Link to="/collections" className="text-xs tracking-[0.25em] uppercase underline underline-offset-4">Back to Collections</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, selectedSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, qty);
    navigate("/checkout");
  };

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="bg-white min-h-screen text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-0 px-6 md:px-12">
        <nav className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#1f1f1f]/30" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
          <Link to="/" className="hover:text-[#1f1f1f]/60 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-[#1f1f1f]/60 transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-[#1f1f1f]/60">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <section className="px-6 md:px-12 py-14 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left — bottle illustration */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          className="relative bg-[#f5f3f0] flex items-center justify-center min-h-[480px] lg:min-h-[600px]">
          {product.tag && (
            <span className="absolute top-6 left-6 text-[10px] tracking-[0.2em] uppercase px-3 py-1 bg-[#1f1f1f] text-white z-10"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>{product.tag}</span>
          )}
          <svg viewBox="0 0 300 500" className="w-56 md:w-72" aria-hidden>
            <defs>
              <radialGradient id="dpg" cx="50%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#ede5d8" />
                <stop offset="100%" stopColor="#cfc3b2" />
              </radialGradient>
              <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="50%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Body */}
            <rect x="90" y="190" width="120" height="190" rx="18" fill="url(#dpg)" stroke="#b8a898" strokeWidth="1.5" />
            <rect x="90" y="190" width="40" height="190" rx="18" fill="url(#shine)" opacity="0.4" />
            {/* Shoulder taper */}
            <path d="M90 210 Q90 190 100 185 L200 185 Q210 190 210 210" fill="#cfc3b2" />
            {/* Neck */}
            <rect x="122" y="150" width="56" height="42" rx="6" fill="#cfc3b2" stroke="#b8a898" strokeWidth="1" />
            {/* Cap */}
            <rect x="112" y="118" width="76" height="38" rx="10" fill="#1f1f1f" />
            <rect x="122" y="122" width="56" height="4" rx="2" fill="white" opacity="0.1" />
            {/* Label */}
            <rect x="100" y="240" width="100" height="1" fill="#a09080" opacity="0.5" />
            <rect x="100" y="330" width="100" height="1" fill="#a09080" opacity="0.5" />
            {/* Dots */}
            <circle cx="150" cy="285" r="4" fill="#a09080" opacity="0.4" />
            <circle cx="138" cy="285" r="2" fill="#a09080" opacity="0.3" />
            <circle cx="162" cy="285" r="2" fill="#a09080" opacity="0.3" />
          </svg>

          {/* Decorative grid lines */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="absolute inset-y-0 border-l border-[#1f1f1f]/[0.03]" style={{ left: `${(i + 1) * 25}%` }} />
          ))}
        </motion.div>

        {/* Right — product info */}
        <div className="flex flex-col justify-center">
          <motion.p {...fadeUp(0)} className="text-[10px] tracking-[0.35em] uppercase text-[#1f1f1f]/35 mb-2"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
            {product.house} · {product.country} · {product.year}
          </motion.p>

          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl tracking-tight font-bold mb-1">{product.name}</motion.h1>

          {/* Rating */}
          <motion.div {...fadeUp(0.12)} className="flex items-center gap-2 mb-6">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: i < Math.round(product.rating) ? "#1f1f1f" : "#1f1f1f18" }} />
              ))}
            </div>
            <span className="text-xs text-[#1f1f1f]/40" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
              {product.rating} ({product.reviews} reviews)
            </span>
          </motion.div>

          {/* Price */}
          <motion.div {...fadeUp(0.16)} className="flex items-baseline gap-3 mb-8">
            <span className="text-3xl font-bold tracking-tight">₱{product.price.toLocaleString()}</span>
            <span className="text-xs text-[#1f1f1f]/30 tracking-[0.15em]" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
              / {selectedSize}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p {...fadeUp(0.2)} className="text-sm leading-relaxed text-[#1f1f1f]/55 mb-8 max-w-md"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
            {product.description}
          </motion.p>

          {/* Size selector */}
          <motion.div {...fadeUp(0.24)} className="mb-6">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-3" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button key={size} onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2 text-xs tracking-[0.15em] uppercase border transition-all duration-200 ${
                    selectedSize === size ? "bg-[#1f1f1f] text-white border-[#1f1f1f]" : "text-[#1f1f1f]/50 border-[#1f1f1f]/15 hover:border-[#1f1f1f]/40"
                  }`} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>
                  {size}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Quantity + gender + stock */}
          <motion.div {...fadeUp(0.27)} className="flex items-center gap-6 mb-8">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Qty</p>
              <div className="flex items-center border border-[#1f1f1f]/15">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-[#1f1f1f]/40 hover:text-[#1f1f1f] transition-colors">−</button>
                <span className="w-8 text-center text-sm" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="w-9 h-9 flex items-center justify-center text-[#1f1f1f]/40 hover:text-[#1f1f1f] transition-colors">+</button>
              </div>
            </div>
            <div className="pt-6">
              <span className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1 border ${product.stock > 5 ? "border-green-200 text-green-600" : "border-red-200 text-red-500"}`}
                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>
                {product.stock > 5 ? `In Stock` : `Only ${product.stock} left`}
              </span>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 mb-10">
            <button onClick={handleAddToCart}
              className={`flex-1 py-4 border text-xs tracking-[0.25em] uppercase transition-all duration-200 ${
                added ? "bg-[#1f1f1f] text-white border-[#1f1f1f]" : "border-[#1f1f1f] text-[#1f1f1f] hover:bg-[#1f1f1f] hover:text-white"
              }`} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            <button onClick={handleBuyNow}
              className="flex-1 py-4 bg-[#1f1f1f] text-white text-xs tracking-[0.25em] uppercase hover:bg-[#1f1f1f]/80 transition-colors"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>
              Buy Now
            </button>
          </motion.div>

          {/* Tags */}
          <motion.div {...fadeUp(0.33)} className="flex items-center gap-3">
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#1f1f1f]/25" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Category</span>
            <span className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 border border-[#1f1f1f]/10 text-[#1f1f1f]/40" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>{product.category}</span>
            <span className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 border border-[#1f1f1f]/10 text-[#1f1f1f]/40" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>{product.gender}</span>
          </motion.div>
        </div>
      </section>

      {/* Scent profile */}
      <section className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]/[0.06]">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-2xl font-bold tracking-tight mb-10">Scent <span className="text-[#1f1f1f]/20 italic">Profile</span></motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Top Notes", notes: product.topNotes, desc: "First impression · 15–30 min" },
            { label: "Heart Notes", notes: product.heartNotes, desc: "The soul · 30 min – 3 hrs" },
            { label: "Base Notes", notes: product.baseNotes, desc: "The memory · 3+ hrs" },
          ].map((tier, i) => (
            <motion.div key={tier.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#1f1f1f]/35 mb-1" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{tier.label}</p>
              <p className="text-[9px] text-[#1f1f1f]/25 mb-4 italic" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{tier.desc}</p>
              <div className="flex flex-wrap gap-2">
                {tier.notes.map((n) => <NoteTag key={n} label={n} />)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]/[0.06]">
          <h2 className="text-2xl font-bold tracking-tight mb-10">You May Also <span className="text-[#1f1f1f]/20 italic">Like</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group block">
                <div className="relative h-48 bg-[#f5f3f0] overflow-hidden mb-3">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet" aria-hidden>
                    <defs><radialGradient id={`rg-${p.id}`} cx="50%" cy="40%" r="55%"><stop offset="0%" stopColor="#e8e0d4"/><stop offset="100%" stopColor="#d4c9b8"/></radialGradient></defs>
                    <rect x="110" y="140" width="80" height="130" rx="12" fill={`url(#rg-${p.id})`} stroke="#b8a898" strokeWidth="1"/>
                    <rect x="130" y="110" width="40" height="35" rx="4" fill="#cfc3b2" stroke="#b8a898" strokeWidth="0.8"/>
                    <rect x="123" y="90" width="54" height="24" rx="6" fill="#1f1f1f"/>
                  </svg>
                </div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#1f1f1f]/35 mb-0.5" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{p.house}</p>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif" }}>{p.name}</span>
                  <span className="text-sm text-[#1f1f1f]/60" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>₱{p.price.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}