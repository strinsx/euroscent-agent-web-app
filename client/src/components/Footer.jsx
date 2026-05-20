import { FOOTER_LINKS } from "../constants/data";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f]/[0.06] px-6 md:px-12 py-14">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Brand */}
        <div>
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-[#1f1f1f]/30"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            Euroscent
          </p>
          <p
            className="text-lg font-extrabold tracking-tight text-[#1f1f1f]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Agency Shop
          </p>
        </div>

        {/* Footer nav */}
        <nav className="flex gap-8 flex-wrap">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-xs text-[#1f1f1f]/40 hover:text-[#1f1f1f] transition-colors tracking-[0.15em] uppercase"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400 }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p
          className="text-xs text-[#1f1f1f]/25"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
        >
          © {new Date().getFullYear()} Euroscent Agency Shop
        </p>
      </div>
    </footer>
  );
}
