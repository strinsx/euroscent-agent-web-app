import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/GuestNavbar";
import Footer from "../components/Footer";
import { CATEGORIES } from "../constants/data.js";
import { useCart } from "../components/CartContext";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

const GENDERS = ["All", "Unisex", "Masculine", "Feminine"];

const fetchData = async (setProducts) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      method: "GET",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const data = await res.json();
    console.log("DATA:", data); // ← what message does it return?
    setProducts(data.products || []);
  } catch (error) {
    console.error(error);
  }
};

function CatalogCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://placehold.co/300x400?text=No+Image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="cursor-pointer group w-[250px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f3f0]" style={{ width: "250px", height: "250px" }}>
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Low Stock badge */}
        {product.stock <= 5 && (
          <span
            className="absolute top-3 right-3 text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border border-red-300 text-red-400"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
          >
            Low Stock
          </span>
        )}

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-[#1f1f1f]/50"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
            >
              Out of Stock
            </span>
          </div>
        )}

        {/* Add to Cart hover button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 inset-x-3"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(product, product.size, 1);
            }}
            disabled={product.stock === 0}
            className="w-full py-2.5 bg-[#1f1f1f] text-white text-[10px] tracking-[0.2em] uppercase disabled:opacity-40"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
          >
            Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-2 w-[250px]">
        <div className="flex items-baseline justify-between">
          <h3
            className="text-sm text-[#1f1f1f]"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
          >
            {product.title}
          </h3>
          <span
            className="text-sm text-[#1f1f1f] ml-2 shrink-0"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            ₱{product.price.toLocaleString()}
          </span>
        </div>

        {/* Description — clamped to 3 lines */}
        {product.desc && (
          <p
            className="text-[10px] text-[#1f1f1f]/45 mt-1 leading-relaxed line-clamp-3"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            {product.desc}
          </p>
        )}

        {/* Stock count */}
        <p
          className="text-[9px] tracking-[0.1em] uppercase mt-1.5"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 300,
            color: product.stock <= 5 ? "#f87171" : "#1f1f1f50",
          }}
        >
          {product.stock === 0
            ? "Out of stock"
            : product.stock <= 5
              ? `Only ${product.stock} left`
              : `${product.stock} in stock`}
        </p>
      </div>
    </motion.div>
  );
}

export default function CollectionsPage() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeGender, setActiveGender] = useState("All");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    fetchData(setProducts);
  }, []);

  const filtered = useMemo(() => {
    let list = [...(Array.isArray(products) ? products : [])]; if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (activeGender !== "All") list = list.filter((p) => p.gender === activeGender);
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "newest") list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }, [products, activeCategory, activeGender, sort]);

  return (
    <div className="bg-white min-h-screen text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif" }}>
      <Navbar />

      {/* Page header */}
      <section className="pt-32 pb-16 px-6 md:px-12 border-b border-[#1f1f1f]/[0.06]">
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase text-[#1f1f1f]/35 mb-3"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Euroscent Agency Shop
        </motion.p>
        <motion.h1
          className="text-5xl md:text-7xl tracking-tight font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          All
          <br />
          <span className="text-[#1f1f1f]/20 italic">Collections</span>
        </motion.h1>
      </section>

      {/* Filters bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#1f1f1f]/[0.06] px-6 md:px-12 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-[9px] tracking-[0.2em] uppercase border transition-all duration-200 ${activeCategory === cat
                  ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                  : "text-[#1f1f1f]/45 border-[#1f1f1f]/12 hover:border-[#1f1f1f]/35"
                  }`}
                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {/* Gender */}
            <div className="flex gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGender(g)}
                  className={`text-[9px] tracking-[0.15em] uppercase transition-colors duration-200 ${activeGender === g
                    ? "text-[#1f1f1f]"
                    : "text-[#1f1f1f]/30 hover:text-[#1f1f1f]/60"
                    }`}
                  style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                >
                  {g}
                </button>
              ))}
            </div>
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-[9px] tracking-[0.15em] uppercase text-[#1f1f1f]/50 bg-transparent border-none focus:outline-none cursor-pointer"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p
          className="text-[9px] tracking-[0.15em] text-[#1f1f1f]/25 mt-2"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
        >
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </p>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 py-14">
        {products.length === 0 ? (
          <div className="text-center py-32">
            <p
              className="text-sm text-[#1f1f1f]/30"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
            >
              Loading products...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
            {filtered.map((p, i) => (
              <CatalogCard key={p._id} product={p} index={i} />
            ))}
          </div>
        )}

        {products.length > 0 && filtered.length === 0 && (
          <div className="text-center py-32">
            <p
              className="text-sm text-[#1f1f1f]/30"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
            >
              No fragrances match these filters.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
