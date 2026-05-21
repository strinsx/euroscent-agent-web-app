// Google Fonts — add this to your index.html <head>:
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Roboto:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">

import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyUs from "./components/WhyUs";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div
      className="bg-white text-[#1f1f1f] min-h-screen antialiased"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <FeaturedProducts />
      <WhyUs />
      <Footer />
    </div>
  );
}
