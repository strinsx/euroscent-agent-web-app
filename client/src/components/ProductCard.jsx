import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heights = {
  tall: "h-96 md:h-[480px]",
  wide: "h-64 md:h-72",
  square: "h-72",
};

export default function ProductCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image / illustration area ── */}
      <div className={`relative overflow-hidden bg-[#f5f3f0] ${heights[item.aspect]}`}>
        {/* Abstract SVG bottle */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 400"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`grd-${item.id}`} cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#e8e0d4" />
              <stop offset="100%" stopColor="#d4c9b8" />
            </radialGradient>
          </defs>

          {/* Bottle body */}
          <motion.rect
            x="110" y="140" width="80" height="130" rx="12"
            fill={`url(#grd-${item.id})`}
            stroke="#b8a898" strokeWidth="1"
            animate={hovered ? { scaleY: 1.03, y: 134 } : { scaleY: 1, y: 140 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "150px 270px" }}
          />
          {/* Bottle neck */}
          <motion.rect
            x="130" y="110" width="40" height="35" rx="4"
            fill="#cfc3b2" stroke="#b8a898" strokeWidth="0.8"
            animate={hovered ? { y: 104 } : { y: 110 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Cap */}
          <motion.rect
            x="123" y="90" width="54" height="24" rx="6"
            fill="#1f1f1f"
            animate={hovered ? { y: 80 } : { y: 90 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Label line */}
          <motion.rect
            x="122" y="188" width="56" height="0.8"
            fill="#a09080" opacity="0.6"
            animate={hovered ? { y: 182 } : { y: 188 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Decorative dot */}
          <motion.circle
            cx="150" cy="214" r="3"
            fill="#a09080" opacity="0.5"
            animate={hovered ? { cy: 208 } : { cy: 214 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        {/* Badge tag */}
        {item.tag && (
          <span
            className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase px-3 py-1 bg-[#1f1f1f] text-white"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
          >
            {item.tag}
          </span>
        )}

        {/* Quick-add overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-4 inset-x-4"
            >
              <button
                className="w-full py-3 bg-[#1f1f1f] text-white text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
              >
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Product info ── */}
      <div className="pt-4 pb-2">
        <p
          className="text-[10px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-1"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
        >
          {item.house}
        </p>
        <div className="flex items-baseline justify-between">
          <h3
            className="text-base text-[#1f1f1f]"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
          >
            {item.name}
          </h3>
          <span
            className="text-sm text-[#1f1f1f]"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            {item.price}
          </span>
        </div>
        <p
          className="text-xs text-[#1f1f1f]/50 mt-1"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300, fontStyle: "italic" }}
        >
          {item.note}
        </p>
      </div>
    </motion.div>
  );
}
