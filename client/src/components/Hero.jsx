import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-screen flex flex-col overflow-hidden pt-16">
      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-l border-[#1f1f1f]/[0.04]"
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>

      {/* Parallax content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10"
      >
        {/* Eyebrow */}
        <motion.p
          className="text-[10px] tracking-[0.45em] uppercase text-[#1f1f1f]/40 mb-8"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Curated European Fragrances · Philippines
        </motion.p>

        {/* Headline — "Euroscent" */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tighter text-[#1f1f1f]"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            Euroscent
          </motion.h1>
        </div>

        {/* Headline — "Agency Shop" (ghost italic) */}
        <div className="overflow-hidden mb-10">
          <motion.h1
            className="text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tighter text-[#1f1f1f]/20"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontStyle: "italic" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          >
            Agency Shop
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          className="max-w-sm text-sm leading-relaxed text-[#1f1f1f]/50"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Discover rare and niche European perfumes, authentically sourced and delivered to your door.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex items-center gap-4 mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          <a
            href="/collections"
            className="px-8 py-3.5 bg-[#1f1f1f] text-white text-xs tracking-[0.25em] uppercase hover:bg-[#1f1f1f]/80 transition-colors"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
          >
            Shop Now
          </a>
          <a
            href="/about"
            className="px-8 py-3.5 border border-[#1f1f1f]/20 text-[#1f1f1f] text-xs tracking-[0.25em] uppercase hover:border-[#1f1f1f]/50 transition-colors"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
          >
            Our Story
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-10 bg-[#1f1f1f]/20"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
