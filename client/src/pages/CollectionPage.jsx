import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/GuestNavbar";
import Footer from "../components/Footer";
import { PRODUCTS, CATEGORIES } from "../constants/data.js";
import { useCart } from "../components/CartContext";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

const GENDERS = ["All", "Unisex", "Masculine", "Feminine"];



function BottleSVG({ id, hovered }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <radialGradient id={`cg-${id}`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#e8e0d4" />
          <stop offset="100%" stopColor="#d4c9b8" />
        </radialGradient>
      </defs>
      <motion.rect x="110" y="140" width="80" height="130" rx="12" fill={`url(#cg-${id})`} stroke="#b8a898" strokeWidth="1"
        animate={hovered ? { y: 134, scaleY: 1.03 } : { y: 140, scaleY: 1 }} transition={{ duration: 0.45 }} style={{ transformOrigin: "150px 270px" }} />
      <motion.rect x="130" y="110" width="40" height="35" rx="4" fill="#cfc3b2" stroke="#b8a898" strokeWidth="0.8"
        animate={hovered ? { y: 104 } : { y: 110 }} transition={{ duration: 0.45 }} />
      <motion.rect x="123" y="90" width="54" height="24" rx="6" fill="#1f1f1f"
        animate={hovered ? { y: 80 } : { y: 90 }} transition={{ duration: 0.45 }} />
    </svg>
  );
}

function CatalogCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative h-64 overflow-hidden bg-[#f5f3f0]">
        <BottleSVG id={product.id} hovered={hovered} />
        {product.tag && (
          <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 bg-[#1f1f1f] text-white"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>{product.tag}</span>
        )}
        {product.stock <= 5 && (
          <span className="absolute top-3 right-3 text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border border-red-300 text-red-400"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>Low Stock</span>
        )}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }}
          className="absolute bottom-3 inset-x-3">
          <button onClick={(e) => { e.stopPropagation(); addItem(product, product.sizes[0], 1); }}
            className="w-full py-2.5 bg-[#1f1f1f] text-white text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>
            Add to Cart
          </button>
        </motion.div>
      </div>
      <div className="pt-3 pb-2">
        <p className="text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/35 mb-0.5"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{product.house} · {product.country}</p>
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>{product.name}</h3>
          <span className="text-sm text-[#1f1f1f]" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>₱{product.price.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ background: i < Math.round(product.rating) ? "#1f1f1f" : "#1f1f1f20" }} />
            ))}
          </div>
          <span className="text-[9px] text-[#1f1f1f]/30" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>({product.reviews})</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeGender, setActiveGender] = useState("All");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (activeGender !== "All") list = list.filter((p) => p.gender === activeGender);
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "newest") list.sort((a, b) => b.year - a.year);
    return list;
  }, [activeCategory, activeGender, sort]);

  return (
    <div className="bg-white min-h-screen text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif" }}>
      <Navbar />

      {/* Page header */}
      <section className="pt-32 pb-16 px-6 md:px-12 border-b border-[#1f1f1f]/[0.06]">
        <motion.p className="text-[10px] tracking-[0.4em] uppercase text-[#1f1f1f]/35 mb-3"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          Euroscent Agency Shop
        </motion.p>
        <motion.h1 className="text-5xl md:text-7xl tracking-tight font-bold"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          All<br /><span className="text-[#1f1f1f]/20 italic">Collections</span>
        </motion.h1>
      </section>

      {/* Filters bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#1f1f1f]/[0.06] px-6 md:px-12 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-[9px] tracking-[0.2em] uppercase border transition-all duration-200 ${
                  activeCategory === cat ? "bg-[#1f1f1f] text-white border-[#1f1f1f]" : "text-[#1f1f1f]/45 border-[#1f1f1f]/12 hover:border-[#1f1f1f]/35"
                }`} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {/* Gender */}
            <div className="flex gap-2">
              {GENDERS.map((g) => (
                <button key={g} onClick={() => setActiveGender(g)}
                  className={`text-[9px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                    activeGender === g ? "text-[#1f1f1f]" : "text-[#1f1f1f]/30 hover:text-[#1f1f1f]/60"
                  }`} style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
                  {g}
                </button>
              ))}
            </div>
            {/* Sort */}
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="text-[9px] tracking-[0.15em] uppercase text-[#1f1f1f]/50 bg-transparent border-none focus:outline-none cursor-pointer"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        <p className="text-[9px] tracking-[0.15em] text-[#1f1f1f]/25 mt-2" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </p>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p, i) => <CatalogCard key={p.id} product={p} index={i} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-32">
            <p className="text-sm text-[#1f1f1f]/30" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
              No fragrances match these filters.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}