import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { CATEGORIES } from "../constants/data.js";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://euroscent-agent-web-app-server.onrender.com/api/products", {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    const list = activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

    return list.slice(0, 8); // cap at 8 for the homepage grid
  }, [products, activeCategory]);

  return (
    <section className="px-6 md:px-12 py-24">
      {/* ── Section header ── */}
      <div className="flex items-end justify-between mb-14">
        <div>
          <motion.p
            className="text-[10px] tracking-[0.35em] uppercase text-[#1f1f1f]/40 mb-2"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Handpicked Selection
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl tracking-tight"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Featured
            <br />
            <span className="text-[#1f1f1f]/20 italic" style={{ fontWeight: 700 }}>
              Fragrances
            </span>
          </motion.h2>
        </div>

        {/* ── Category filter (desktop only) ── */}
        <div className="hidden md:flex items-center gap-2 flex-wrap justify-end max-w-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                  : "text-[#1f1f1f]/50 border-[#1f1f1f]/15 hover:border-[#1f1f1f]/40"
              }`}
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.length === 0 && (
          <p
            className="col-span-4 text-center text-sm text-[#1f1f1f]/30 py-16"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            Loading fragrances...
          </p>
        )}

        {products.length > 0 && filtered.length === 0 && (
          <p
            className="col-span-4 text-center text-sm text-[#1f1f1f]/30 py-16"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            No fragrances in this category.
          </p>
        )}

        {filtered.map((product, i) => (
          <ProductCard key={product._id} item={product} index={i} />
        ))}
      </div>

      {/* ── View all CTA ── */}
      <div className="text-center mt-16">
        <Link
          to="/collections"
          className="inline-block px-10 py-4 border border-[#1f1f1f]/20 text-xs tracking-[0.3em] uppercase text-[#1f1f1f]/60 hover:border-[#1f1f1f] hover:text-[#1f1f1f] transition-all duration-300"
          style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
        >
          View All Fragrances
        </Link>
      </div>
    </section>
  );
}