import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export default function ProductCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const imageUrl =
    item.images && item.images.length > 0
      ? item.images[0]
      : "https://placehold.co/300x400?text=No+Image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/product/${item._id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f3f0] h-72">
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Low stock badge */}
        {item.stock <= 5 && item.stock > 0 && (
          <span
            className="absolute top-3 right-3 text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border border-red-300 text-red-400"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
          >
            Low Stock
          </span>
        )}

        {/* Out of stock overlay */}
        {item.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-[#1f1f1f]/50"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
            >
              Out of Stock
            </span>
          </div>
        )}

        {/* Add to cart hover button */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-3 inset-x-3"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addItem(item, item.size, 1);
                }}
                disabled={item.stock === 0}
                className="w-full py-2.5 bg-[#1f1f1f] text-white text-[10px] tracking-[0.2em] uppercase disabled:opacity-40"
                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
              >
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        {item.house && (
          <p
            className="text-[10px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-1"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            {item.house}
          </p>
        )}

        <div className="flex items-baseline justify-between gap-2">
          <h3
            className="text-sm text-[#1f1f1f] leading-snug"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
          >
            {item.title}
          </h3>
          <span
            className="text-sm text-[#1f1f1f] shrink-0"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            ₱{item.price?.toLocaleString()}
          </span>
        </div>

        {item.desc && (
          <p
            className="text-[10px] text-[#1f1f1f]/45 mt-1 leading-relaxed line-clamp-2"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            {item.desc}
          </p>
        )}

        <p
          className="text-[9px] tracking-[0.1em] uppercase mt-1.5"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 300,
            color: item.stock <= 5 ? "#f87171" : "#1f1f1f50",
          }}
        >
          {item.stock === 0
            ? "Out of stock"
            : item.stock <= 5
            ? `Only ${item.stock} left`
            : `${item.stock} in stock`}
        </p>
      </div>
    </motion.div>
  );
}