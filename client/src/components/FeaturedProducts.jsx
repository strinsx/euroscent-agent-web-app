import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { FEATURED, CATEGORIES } from "../constants/data.js";

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

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
            <span
              className="text-[#1f1f1f]/20 italic"
              style={{ fontWeight: 700 }}
            >
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

      {/* ── Bento grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {FEATURED.map((item, i) => (
          <ProductCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* ── View all CTA ── */}
      <div className="text-center mt-16">
        <a
          href="/collections"
          className="inline-block px-10 py-4 border border-[#1f1f1f]/20 text-xs tracking-[0.3em] uppercase text-[#1f1f1f]/60 hover:border-[#1f1f1f] hover:text-[#1f1f1f] transition-all duration-300"
          style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
        >
          View All Fragrances
        </a>
      </div>
    </section>
  );
}
