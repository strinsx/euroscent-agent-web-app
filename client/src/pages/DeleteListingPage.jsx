import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ProtectedRoute from "../constants/protectedrouting";

const CATEGORIES = ["All", "Floral", "Oriental", "Fresh", "Woody", "Gourmand", "Citrus", "Fougère"];
const EDIT_CATEGORIES = ["Floral", "Oriental", "Fresh", "Woody", "Gourmand", "Citrus", "Fougère"];
const GENDERS = ["Unisex", "Masculine", "Feminine"];

export default function DeleteListingPage() {
  ProtectedRoute();

  const user = localStorage.getItem("user") || "Admin";
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [confirming, setConfirming] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Edit state
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://euroscent-agent-web-app-server.onrender.com/api/products`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) list = list.filter((p) =>
      p.title?.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [products, activeCategory, search]);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await fetch(
        `https://euroscent-agent-web-app-server.onrender.com/api/products/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(null);
      setConfirming(null);
    }
  };

  const openEdit = (product) => {
    setEditingProduct(product._id || product.id);
    setEditForm({
      title: product.title || "",
      desc: product.desc || "",
      price: product.price || "",
      stock: product.stock || "",
      gender: product.gender || "Unisex",
      category: product.category || "",
    });
  };

  const handleSave = async () => {
  setSaving(true);
  try {
    const res = await fetch(
      `https://euroscent-agent-web-app-server.onrender.com/api/products/${editingProduct}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      }
    );

    // guard — only parse JSON if response is actually JSON
    const contentType = res.headers.get("content-type");
    const data = contentType?.includes("application/json") ? await res.json() : null;

    if (res.ok) {
      setProducts((prev) =>
        prev.map((p) =>
          (p._id || p.id) === editingProduct ? { ...p, ...editForm } : p
        )
      );
      setEditingProduct(null);
    } else {
      console.error("Update failed:", data?.message || res.status);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-[#1f1f1f]/40">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-[#1f1f1f]">

      {/* TOP BAR */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#1f1f1f] h-14 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-6">
          <Link to="/analytics" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            <span className="text-[10px] tracking-[0.25em] uppercase">Dashboard</span>
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Manage Listings</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">{user[0].toUpperCase()}</span>
            </div>
            <span className="text-[10px] text-white/40 hidden md:block">{user}</span>
          </div>
          <button
            onClick={logout}
            className="text-[10px] tracking-[0.2em] uppercase text-white/25 hover:text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="pt-14 px-6 md:px-12">

        {/* HEADING */}
        <motion.div
          className="py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#1f1f1f]/30 mb-2">
            Euroscent Agency Shop
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Manage{" "}
            <span className="text-[#1f1f1f]/20 italic">Listings</span>
          </h1>
        </motion.div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border border-[#1f1f1f]/15 px-4 py-2.5 text-sm outline-none focus:border-[#1f1f1f]/40 transition-colors w-full md:w-72"
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-[9px] tracking-[0.2em] uppercase border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                    : "text-[#1f1f1f]/45 border-[#1f1f1f]/12 hover:border-[#1f1f1f]/35"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[9px] tracking-[0.15em] text-[#1f1f1f]/25 mb-6">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-16">
          {filtered.map((product, i) => {
            const id = product._id || product.id;
            const imageUrl = product.images?.[0] || "https://placehold.co/300x400?text=No+Image";
            const isConfirming = confirming === id;
            const isDeleting = deleting === id;

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="border border-[#1f1f1f]/[0.08] overflow-hidden"
              >
                <div className="relative bg-[#f5f3f0] aspect-square overflow-hidden">
                  <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-2 right-2 text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 border border-amber-300 text-amber-500 bg-white">
                      Low Stock
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute top-2 right-2 text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 border border-red-300 text-red-400 bg-white">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <p className="text-xs font-semibold truncate">{product.title}</p>
                  <p className="text-[10px] text-[#1f1f1f]/40 mt-0.5">
                    ₱{product.price?.toLocaleString()} · {product.stock} in stock
                  </p>

                  {/* EDIT + DELETE BUTTONS */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openEdit(product)}
                      className="flex-1 py-1.5 text-[9px] tracking-[0.2em] uppercase border border-[#1f1f1f]/20 text-[#1f1f1f]/50 hover:border-[#1f1f1f]/50 hover:text-[#1f1f1f] transition-colors"
                    >
                      Edit
                    </button>

                    {!isConfirming ? (
                      <button
                        onClick={() => setConfirming(id)}
                        className="flex-1 py-1.5 text-[9px] tracking-[0.2em] uppercase border border-red-200 text-red-400 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    ) : (
                      <div className="flex gap-1 flex-1">
                        <button
                          onClick={() => handleDelete(id)}
                          disabled={isDeleting}
                          className="flex-1 py-1.5 text-[9px] tracking-[0.15em] uppercase bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          {isDeleting ? "..." : "Sure?"}
                        </button>
                        <button
                          onClick={() => setConfirming(null)}
                          className="flex-1 py-1.5 text-[9px] tracking-[0.15em] uppercase border border-[#1f1f1f]/15 text-[#1f1f1f]/50 hover:border-[#1f1f1f]/35 transition-colors"
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 bg-white z-50 w-full md:w-[520px] p-8 shadow-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold tracking-tight">
                  Edit <span className="text-[#1f1f1f]/25 italic">Listing</span>
                </h2>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-[#1f1f1f]/30 hover:text-[#1f1f1f] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-5">

                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2">
                    Title
                  </label>
                  <input
                    value={editForm.title}
                    onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                    className="w-full border border-[#1f1f1f]/15 px-4 py-2.5 text-sm outline-none focus:border-[#1f1f1f]/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editForm.desc}
                    onChange={(e) => setEditForm((p) => ({ ...p, desc: e.target.value }))}
                    rows={3}
                    className="w-full border border-[#1f1f1f]/15 px-4 py-2.5 text-sm outline-none focus:border-[#1f1f1f]/40 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2">
                      Price (₱)
                    </label>
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm((p) => ({ ...p, price: e.target.value }))}
                      className="w-full border border-[#1f1f1f]/15 px-4 py-2.5 text-sm outline-none focus:border-[#1f1f1f]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={editForm.stock}
                      onChange={(e) => setEditForm((p) => ({ ...p, stock: e.target.value }))}
                      className="w-full border border-[#1f1f1f]/15 px-4 py-2.5 text-sm outline-none focus:border-[#1f1f1f]/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2">
                    Gender
                  </label>
                  <div className="flex gap-2">
                    {GENDERS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setEditForm((p) => ({ ...p, gender: g }))}
                        className={`flex-1 py-2 text-[9px] tracking-[0.2em] uppercase border transition-all duration-200 ${
                          editForm.gender === g
                            ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                            : "border-[#1f1f1f]/15 text-[#1f1f1f]/50 hover:border-[#1f1f1f]/40"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EDIT_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setEditForm((p) => ({ ...p, category: cat }))}
                        className={`px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase border transition-all duration-200 ${
                          editForm.category === cat
                            ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                            : "border-[#1f1f1f]/15 text-[#1f1f1f]/50 hover:border-[#1f1f1f]/40"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3 bg-[#1f1f1f] text-white text-xs tracking-[0.25em] uppercase hover:bg-[#1f1f1f]/80 transition-colors disabled:opacity-40"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-3 border border-[#1f1f1f]/15 text-xs tracking-[0.25em] uppercase text-[#1f1f1f]/50 hover:border-[#1f1f1f]/35 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}