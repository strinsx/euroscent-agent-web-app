import { motion } from "framer-motion";
import { MARQUEE_ITEMS } from "../constants/data";

export default function MarqueeStrip() {
  // Double items so the looping animation is seamless
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="overflow-hidden border-y border-[#1f1f1f]/10 py-3 bg-[#1f1f1f]">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-xs tracking-[0.25em] uppercase text-white/70 font-light"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {item}
            <span className="mx-6 text-white/30">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
