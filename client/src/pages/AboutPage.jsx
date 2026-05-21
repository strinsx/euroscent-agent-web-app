import { motion } from "framer-motion";
import Navbar from "../components/GuestNavbar";
import Footer from "../components/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const TEAM = [
  { name: "Isabelle Moreau", role: "Founder & Nose", bio: "Former perfumer at Grasse, France. 15 years curating the world's finest olfactory experiences." },
  { name: "Marco dela Cruz", role: "Head of Operations", bio: "Ensures every bottle reaches you in pristine condition — with obsessive attention to detail." },
  { name: "Sofia Reyes", role: "Client Experience", bio: "Fragrance advisor and brand storyteller. She'll help you find your signature scent." },
];

const MILESTONES = [
  { year: "2018", event: "Founded in Makati, Philippines — first niche fragrance boutique in the country." },
  { year: "2019", event: "Established direct partnerships with 12 European perfume houses." },
  { year: "2021", event: "Launched online store, shipping nationwide across the Philippines." },
  { year: "2023", event: "Expanded catalog to over 200 unique fragrances from 40+ houses." },
  { year: "2024", event: "Opened flagship experience studio in BGC." },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 md:px-12">
        <motion.p className="text-[10px] tracking-[0.4em] uppercase text-[#1f1f1f]/35 mb-4"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          Our Story
        </motion.p>
        <motion.h1 className="text-5xl md:text-8xl tracking-tight font-bold leading-[0.95] mb-16 max-w-4xl"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          We believe scent
          <br />
          <span className="text-[#1f1f1f]/20 italic">is memory.</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          <motion.p className="text-base leading-relaxed text-[#1f1f1f]/55"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }} {...fadeUp(0.1)}>
            Euroscent Agency Shop was born from a single belief: that the finest European fragrances deserve to reach every corner of the Philippines. We travel to the source — the ateliers of France, the studios of Belgium, the distilleries of Spain — to bring you scents that tell stories.
          </motion.p>
          <motion.p className="text-base leading-relaxed text-[#1f1f1f]/55"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }} {...fadeUp(0.18)}>
            Every bottle we stock is chosen by hand. We don't chase volume — we chase quality, character, and the ineffable feeling of a fragrance that stops you mid-breath and holds you still.
          </motion.p>
        </div>
      </section>

      {/* Dark editorial band */}
      <section className="mx-6 md:mx-12 bg-[#1f1f1f] px-10 md:px-20 py-20 md:py-28 relative overflow-hidden mb-24">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="absolute inset-y-0 border-l border-white/[0.04]" style={{ left: `${(i + 1) * 16.66}%` }} />
        ))}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { num: "200+", label: "Unique Fragrances" },
            { num: "40+", label: "European Houses" },
            { num: "10K+", label: "Happy Customers" },
          ].map((stat, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)}>
              <p className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-2">{stat.num}</p>
              <p className="text-xs tracking-[0.3em] uppercase text-white/35" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="absolute bottom-0 right-6 text-[18vw] leading-none text-white/[0.025] font-extrabold pointer-events-none select-none" aria-hidden>ES</div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-12 py-16 mb-16">
        <motion.h2 className="text-3xl font-bold tracking-tight mb-14" {...fadeUp(0)}>
          Our <span className="text-[#1f1f1f]/20 italic">Journey</span>
        </motion.h2>
        <div className="relative max-w-2xl">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1f1f1f]/[0.08]" />
          {MILESTONES.map((m, i) => (
            <motion.div key={i} className="flex gap-8 pb-10 pl-8 relative" {...fadeUp(i * 0.1)}>
              <div className="absolute left-0 top-1 w-px h-2 bg-[#1f1f1f] -translate-x-0" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#1f1f1f]/30 flex-shrink-0 mt-0.5 w-10"
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{m.year}</span>
              <p className="text-sm text-[#1f1f1f]/60 leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{m.event}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]/[0.06]">
        <motion.h2 className="text-3xl font-bold tracking-tight mb-14" {...fadeUp(0)}>
          The <span className="text-[#1f1f1f]/20 italic">Team</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {TEAM.map((member, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)}>
              <div className="w-full aspect-square bg-[#f5f3f0] mb-5 flex items-end p-5">
                <div className="w-10 h-10 bg-[#1f1f1f] flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{member.name[0]}</span>
                </div>
              </div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#1f1f1f]/30 mb-1" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{member.role}</p>
              <h3 className="text-base font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>{member.name}</h3>
              <p className="text-xs text-[#1f1f1f]/45 leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}