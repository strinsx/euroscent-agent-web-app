import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const CATEGORIES = ["Floral", "Oriental", "Fresh", "Woody", "Gourmand", "Citrus", "Fougère"];
const SIZES = ["30ml", "50ml", "75ml", "100ml", "125ml", "150ml", "200ml"];
const GENDERS = ["Unisex", "Masculine", "Feminine"];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────





function FieldLabel({ children }) {
    return (
        <label
            className="block text-[10px] tracking-[0.28em] uppercase text-[#1f1f1f]/40 mb-2"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
        >
            {children}
        </label>
    );
}

function TextInput({ className = "", ...props }) {
    return (
        <input
            className={`w-full border-b border-[#1f1f1f]/12 bg-transparent py-3 text-sm text-[#1f1f1f] placeholder:text-[#1f1f1f]/20 focus:outline-none focus:border-[#1f1f1f]/50 transition-colors duration-200 ${className}`}
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
            {...props}
        />
    );
}

function SelectInput({ children, className = "", ...props }) {
    return (
        <select
            className={`w-full border-b border-[#1f1f1f]/12 bg-transparent py-3 text-sm text-[#1f1f1f] focus:outline-none focus:border-[#1f1f1f]/50 transition-colors duration-200 appearance-none cursor-pointer ${className}`}
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
            {...props}
        >
            {children}
        </select>
    );
}

// Pill multi-select
function PillSelect({ options, selected, onToggle }) {
    return (
        <div className="flex flex-wrap gap-2 pt-1">
            {options.map((opt) => {
                const active = selected.includes(opt);
                return (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => onToggle(opt)}
                        className={`px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase border transition-all duration-200 ${active
                            ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                            : "text-[#1f1f1f]/45 border-[#1f1f1f]/12 hover:border-[#1f1f1f]/35"
                            }`}
                        style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}

// Image drop-zone
function ImageDropZone({ images, onAdd, onRemove }) {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    const handleFiles = (files) => {
        const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
        const previews = valid.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
        onAdd(previews);
    };

    return (
        <div className="space-y-3">
            {/* Drop target */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleFiles(e.dataTransfer.files);
                }}
                onClick={() => inputRef.current?.click()}
                className={`relative border border-dashed cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center py-10 gap-3 ${dragging
                    ? "border-[#1f1f1f]/50 bg-[#1f1f1f]/[0.02]"
                    : "border-[#1f1f1f]/15 hover:border-[#1f1f1f]/30"
                    }`}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1f1f1f" strokeWidth="1" opacity="0.25">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                </svg>
                <p
                    className="text-[11px] tracking-[0.2em] uppercase text-[#1f1f1f]/30"
                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                >
                    Drop images here or <span className="underline underline-offset-2">browse</span>
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {/* Previews */}
            {images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                    <AnimatePresence>
                        {images.map((img, i) => (
                            <motion.div
                                key={img.url}
                                className="relative aspect-square bg-[#f5f3f0] overflow-hidden group"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.25 }}
                            >
                                <img src={img.url} alt="" className="w-full h-full object-cover" />
                                {i === 0 && (
                                    <span
                                        className="absolute top-1 left-1 text-[8px] tracking-[0.15em] uppercase bg-[#1f1f1f] text-white px-1.5 py-0.5"
                                        style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
                                    >
                                        Cover
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => onRemove(i)}
                                    className="absolute top-1 right-1 w-5 h-5 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Remove image"
                                >
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1f1f1f" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

// Section wrapper with animated reveal
function Section({ title, number, delay = 0, children }) {
    return (
        <motion.div
            className="border-t border-[#1f1f1f]/[0.06] pt-10 pb-4"
            {...fadeUp(delay)}
        >
            <div className="flex items-center gap-4 mb-8">
                <span
                    className="text-[10px] tracking-[0.3em] text-[#1f1f1f]/20"
                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                >
                    {number}
                </span>
                <div className="w-6 h-px bg-[#1f1f1f]/15" />
                <h2
                    className="text-sm tracking-[0.15em] uppercase text-[#1f1f1f]"
                    style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
                >
                    {title}
                </h2>
            </div>
            {children}
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────

const EMPTY_FORM = {
    name: "",
    house: "",
    description: "",
    price: "",
    comparePrice: "",
    stock: "",
    sku: "",
    gender: "Unisex",
    year: "",
    country: "",
    topNotes: "",
    heartNotes: "",
    baseNotes: "",
    category: [],
    sizes: [],
    tags: "",
};

export default function CreateListingPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState(EMPTY_FORM);
    const [images, setImages] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) {

            alert('session expired')
            navigate('/')

        }

    }, [])



    const set = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const togglePill = (field) => (val) =>
        setForm((prev) => ({
            ...prev,
            [field]: prev[field].includes(val)
                ? prev[field].filter((v) => v !== val)
                : [...prev[field], val],
        }));

    const addImages = (imgs) => setImages((prev) => [...prev, ...imgs]);
    const removeImage = (i) => setImages((prev) => prev.filter((_, idx) => idx !== i));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // TODO: POST to your backend with token in Authorization header
        // const token = localStorage.getItem("euroscent_token");
        // await fetch("/api/listings", {
        //   method: "POST",
        //   headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        //   body: JSON.stringify({ ...form, images: images.map(i => i.file) }),
        // });

        await new Promise((r) => setTimeout(r, 1400)); // simulate network
        setSubmitting(false);
        setSubmitted(true);
    };

    // ── Success state ──
    if (submitted) {
        return (
            <div
                className="min-h-screen bg-white flex flex-col items-center justify-center px-8"
                style={{ fontFamily: "Manrope, sans-serif" }}
            >
                <motion.div
                    className="text-center max-w-xs"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="w-12 h-12 border border-[#1f1f1f]/15 flex items-center justify-center mx-auto mb-8">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1f1f1f" strokeWidth="1.5">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <p
                        className="text-[10px] tracking-[0.4em] uppercase text-[#1f1f1f]/35 mb-3"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                    >
                        Listing Created
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-[#1f1f1f] mb-2">
                        {form.name || "Your fragrance"}
                    </h2>
                    <p
                        className="text-sm text-[#1f1f1f]/40 leading-relaxed mb-10"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                    >
                        Your listing has been saved and is pending review.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => { setForm(EMPTY_FORM); setImages([]); setSubmitted(false); }}
                            className="px-6 py-3 bg-[#1f1f1f] text-white text-xs tracking-[0.25em] uppercase"
                            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
                        >
                            Add Another
                        </button>
                        <Link
                            to="/"
                            className="px-6 py-3 border border-[#1f1f1f]/20 text-xs tracking-[0.25em] uppercase text-[#1f1f1f]/60 hover:border-[#1f1f1f]/50 transition-colors"
                            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
                        >
                            Go Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ── Main form ──
    return (
        <div
            className="min-h-screen bg-white text-[#1f1f1f]"
            style={{ fontFamily: "Manrope, sans-serif" }}
        >


            {/* ── Page body ── */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-14">
                {/* Page heading */}
                <motion.div className="mb-14" {...fadeUp(0)}>
                    <p
                        className="text-[10px] tracking-[0.4em] uppercase text-[#1f1f1f]/30 mb-3"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                    >
                        Euroscent Agency Shop
                    </p>
                    <h1
                        className="text-4xl md:text-5xl tracking-tight font-bold leading-tight"
                    >
                        New
                        <br />
                        <span className="text-[#1f1f1f]/20 italic">Listing</span>
                    </h1>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-0">

                    {/* ── 01 · Product Images ── */}
                    <Section title="Product Images" number="01" delay={0.05}>
                        <ImageDropZone images={images} onAdd={addImages} onRemove={removeImage} />
                    </Section>

                    {/* ── 02 · Basic Info ── */}
                    <Section title="Basic Information" number="02" delay={0.1}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
                            <div>
                                <FieldLabel>Fragrance Name *</FieldLabel>
                                <TextInput
                                    value={form.name}
                                    onChange={set("name")}
                                    placeholder="e.g. Nuit Dorée"
                                    required
                                />
                            </div>
                            <div>
                                <FieldLabel>Perfume House / Brand *</FieldLabel>
                                <TextInput
                                    value={form.house}
                                    onChange={set("house")}
                                    placeholder="e.g. Maison Éclat"
                                    required
                                />
                            </div>
                            <div>
                                <FieldLabel>Country of Origin</FieldLabel>
                                <TextInput
                                    value={form.country}
                                    onChange={set("country")}
                                    placeholder="e.g. France"
                                />
                            </div>
                            <div>
                                <FieldLabel>Year Released</FieldLabel>
                                <TextInput
                                    type="number"
                                    value={form.year}
                                    onChange={set("year")}
                                    placeholder="e.g. 2021"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <FieldLabel>Description *</FieldLabel>
                                <textarea
                                    value={form.description}
                                    onChange={set("description")}
                                    required
                                    rows={4}
                                    placeholder="Describe the fragrance — its story, character, and mood..."
                                    className="w-full border-b border-[#1f1f1f]/12 bg-transparent py-3 text-sm text-[#1f1f1f] placeholder:text-[#1f1f1f]/20 focus:outline-none focus:border-[#1f1f1f]/50 transition-colors duration-200 resize-none"
                                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                                />
                            </div>
                        </div>
                    </Section>

                    {/* ── 03 · Classification ── */}
                    <Section title="Classification" number="03" delay={0.15}>
                        <div className="space-y-8">
                            <div>
                                <FieldLabel>Gender</FieldLabel>
                                <div className="flex gap-2 pt-1">
                                    {GENDERS.map((g) => (
                                        <button
                                            key={g}
                                            type="button"
                                            onClick={() => setForm((p) => ({ ...p, gender: g }))}
                                            className={`px-5 py-1.5 text-[10px] tracking-[0.2em] uppercase border transition-all duration-200 ${form.gender === g
                                                ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                                                : "text-[#1f1f1f]/45 border-[#1f1f1f]/12 hover:border-[#1f1f1f]/35"
                                                }`}
                                            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <FieldLabel>Category (select all that apply)</FieldLabel>
                                <PillSelect
                                    options={CATEGORIES}
                                    selected={form.category}
                                    onToggle={togglePill("category")}
                                />
                            </div>
                            <div>
                                <FieldLabel>Available Sizes</FieldLabel>
                                <PillSelect
                                    options={SIZES}
                                    selected={form.sizes}
                                    onToggle={togglePill("sizes")}
                                />
                            </div>
                        </div>
                    </Section>

                    {/* ── 04 · Scent Profile ── */}
                    <Section title="Scent Profile" number="04" delay={0.2}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-7">
                            <div>
                                <FieldLabel>Top Notes</FieldLabel>
                                <TextInput
                                    value={form.topNotes}
                                    onChange={set("topNotes")}
                                    placeholder="Bergamot, Lemon..."
                                />
                            </div>
                            <div>
                                <FieldLabel>Heart Notes</FieldLabel>
                                <TextInput
                                    value={form.heartNotes}
                                    onChange={set("heartNotes")}
                                    placeholder="Rose, Iris..."
                                />
                            </div>
                            <div>
                                <FieldLabel>Base Notes</FieldLabel>
                                <TextInput
                                    value={form.baseNotes}
                                    onChange={set("baseNotes")}
                                    placeholder="Oud, Sandalwood..."
                                />
                            </div>
                        </div>
                    </Section>

                    {/* ── 05 · Pricing & Inventory ── */}
                    <Section title="Pricing & Inventory" number="05" delay={0.25}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-7">
                            <div>
                                <FieldLabel>Price (₱) *</FieldLabel>
                                <TextInput
                                    type="number"
                                    value={form.price}
                                    onChange={set("price")}
                                    placeholder="4800"
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <FieldLabel>Compare-at Price (₱)</FieldLabel>
                                <TextInput
                                    type="number"
                                    value={form.comparePrice}
                                    onChange={set("comparePrice")}
                                    placeholder="5500"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <FieldLabel>Stock Quantity *</FieldLabel>
                                <TextInput
                                    type="number"
                                    value={form.stock}
                                    onChange={set("stock")}
                                    placeholder="0"
                                    required
                                    min="0"
                                />
                            </div>
                            <div>
                                <FieldLabel>SKU / Product Code</FieldLabel>
                                <TextInput
                                    value={form.sku}
                                    onChange={set("sku")}
                                    placeholder="ES-001"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <FieldLabel>Tags (comma-separated)</FieldLabel>
                                <TextInput
                                    value={form.tags}
                                    onChange={set("tags")}
                                    placeholder="niche, oud, evening, gift"
                                />
                            </div>
                        </div>
                    </Section>

                    {/* ── Submit ── */}
                    <motion.div
                        className="pt-12 pb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                        {...fadeUp(0.3)}
                    >
                        <button
                            type="submit"
                            disabled={submitting}
                            className="relative px-12 py-4 bg-[#1f1f1f] text-white text-xs tracking-[0.3em] uppercase hover:bg-[#1f1f1f]/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] flex items-center justify-center gap-3"
                            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
                        >
                            {submitting ? (
                                <>
                                    <motion.span
                                        className="w-3 h-3 border border-white/40 border-t-white rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    />
                                    Publishing...
                                </>
                            ) : (
                                "Publish Listing"
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-xs tracking-[0.2em] uppercase text-[#1f1f1f]/35 hover:text-[#1f1f1f]/65 transition-colors"
                            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
                        >
                            Discard
                        </button>
                    </motion.div>
                </form>
            </div>
        </div>
    );
}