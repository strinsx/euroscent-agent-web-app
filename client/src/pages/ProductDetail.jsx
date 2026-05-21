import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/GuestNavbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: "GET",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
  if (!product || product.stock === 0) return;

  addItem(
    {
      id: product._id,          // ObjectId from MongoDB
      name: product.title,      // "Euroscent Eago EDP"
      house: product.category,  // "Woody" — closest thing to house
      price: product.price,     // 500
    },
    `${product.size}ml`,        // "30ml" — formats the number nicely
    qty
  );

  setAdded(true);
  setTimeout(() => setAdded(false), 2000);
};

const handleBuyNow = () => {
  if (!product || product.stock === 0) return;

  addItem(
    {
      id: product._id,
      name: product.title,
      house: product.category,
      price: product.price,
    },
    `${product.size}ml`,
    qty
  );

  navigate("/checkout");
};

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: "Manrope, sans-serif" }}>
        <Navbar />
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[11px] tracking-[0.4em] uppercase text-[#1f1f1f]/30"
        >
          Loading...
        </motion.p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: "Manrope, sans-serif" }}>
        <Navbar />
        <div className="text-center">
          <p className="text-sm text-[#1f1f1f]/40 mb-6">Fragrance not found.</p>
          <Link to="/collections" className="text-xs tracking-[0.25em] uppercase underline underline-offset-4">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://placehold.co/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-0 px-6 md:px-12">
        <nav
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#1f1f1f]/30"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
        >
          <Link to="/" className="hover:text-[#1f1f1f]/60 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-[#1f1f1f]/60 transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-[#1f1f1f]/60">{product.title}</span>
        </nav>
      </div>

      {/* Main product section */}
      <section className="px-6 md:px-12 py-14 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Left — product image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#f5f3f0] overflow-hidden flex items-center justify-center min-h-[480px] lg:min-h-[600px]"
        >
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover absolute inset-0"
          />

          {/* Stock badge */}
          {product.stock > 0 && product.stock <= 5 && (
            <span
              className="absolute top-6 right-6 text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border border-red-300 text-red-400 bg-white z-10"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
            >
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#1f1f1f]/40">
                Out of Stock
              </span>
            </div>
          )}
        </motion.div>

        {/* Right — product info */}
        <div className="flex flex-col justify-center">

          {/* Category + Gender */}
          <motion.div {...fadeUp(0)} className="flex gap-2 mb-4">
            {product.category && (
              <span
                className="text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 border border-[#1f1f1f]/15 text-[#1f1f1f]/40"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {product.category}
              </span>
            )}
            {product.gender && (
              <span
                className="text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 border border-[#1f1f1f]/15 text-[#1f1f1f]/40"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {product.gender}
              </span>
            )}
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl tracking-tight font-bold mb-4">
            {product.title}
          </motion.h1>

          {/* Price */}
          <motion.div {...fadeUp(0.12)} className="flex items-baseline gap-3 mb-8">
            <span className="text-3xl font-bold tracking-tight">₱{product.price.toLocaleString()}</span>
            <span
              className="text-xs text-[#1f1f1f]/30 tracking-[0.15em]"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
            >
              / {product.size}ml
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            {...fadeUp(0.16)}
            className="text-sm leading-relaxed text-[#1f1f1f]/55 mb-8 max-w-md"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            {product.desc}
          </motion.p>

          {/* Details grid */}
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/30 mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>Size</p>
              <p className="text-sm text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>{product.size} ml</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/30 mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>Availability</p>
              <p
                className="text-sm"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  color: product.stock === 0 ? "#f87171" : product.stock <= 5 ? "#f87171" : "#16a34a",
                }}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : product.stock <= 5
                  ? `Only ${product.stock} left`
                  : `${product.stock} in stock`}
              </p>
            </div>
          </motion.div>

          <div className="w-full h-px bg-[#1f1f1f]/08 mb-6" />

          {/* Quantity */}
          {product.stock > 0 && (
            <motion.div {...fadeUp(0.24)} className="flex items-center gap-4 mb-6">
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/30" style={{ fontFamily: "Manrope, sans-serif" }}>Qty</p>
              <div className="flex items-center border border-[#1f1f1f]/15">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-[#1f1f1f]/40 hover:text-[#1f1f1f] transition-colors"
                >−</button>
                <span className="w-8 text-center text-sm" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="w-9 h-9 flex items-center justify-center text-[#1f1f1f]/40 hover:text-[#1f1f1f] transition-colors"
                >+</button>
              </div>
            </motion.div>
          )}

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.28)} className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-4 border text-xs tracking-[0.25em] uppercase transition-all duration-200 disabled:opacity-40 ${
                added
                  ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                  : "border-[#1f1f1f] text-[#1f1f1f] hover:bg-[#1f1f1f] hover:text-white"
              }`}
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 py-4 bg-[#1f1f1f] text-white text-xs tracking-[0.25em] uppercase hover:bg-[#1f1f1f]/80 transition-colors disabled:opacity-40"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
            >
              Buy Now
            </button>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
