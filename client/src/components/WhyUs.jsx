import { motion } from "framer-motion";
import { WHY_US } from "../constants/data";

export default function WhyUs() {
  return (
    <section className="px-6 md:px-12 py-20 border-t border-[#1f1f1f]/[0.06]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
        {WHY_US.map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <span
              className="text-xs text-[#1f1f1f]/25 tracking-[0.3em]"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
            >
              {item.num}
            </span>
            <div className="w-8 h-px bg-[#1f1f1f]/20" />
            <h3
              className="text-xl"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
            >
              {item.title}
            </h3>
            <p
              className="text-sm text-[#1f1f1f]/50 leading-relaxed"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
            >
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
