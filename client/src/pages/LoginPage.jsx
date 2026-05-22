import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async(e) => {
        e.preventDefault();
        

        try {

            const res = await fetch('https://euroscent-agent-web-app-server.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password
                })
            })

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            if (!data.token || !data.user) {
                alert(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user.username);

            alert(data.message || "Login successful");
            navigate('/analytics');
        } catch (error) {
            console.error(error)
        }
        


        console.log("Login:", form);
    };

    return (
        <div className="min-h-screen bg-white flex" style={{ fontFamily: "Manrope, sans-serif" }}>

            {/* ── Left panel — decorative ── */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#1f1f1f] relative overflow-hidden flex-col justify-between p-14">
                {/* Grid lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-y-0 border-l border-white/[0.04]"
                        style={{ left: `${(i + 1) * 16.66}%` }}
                    />
                ))}

                {/* Top — brand */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link to="/" className="flex flex-col leading-none">
                        <span
                            className="text-[10px] tracking-[0.45em] uppercase text-white/30"
                            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                        >
                            Euroscent
                        </span>
                        <span className="text-2xl tracking-[0.06em] text-white font-extrabold">
                            Agency Shop
                        </span>
                    </Link>
                </motion.div>

                {/* Middle — editorial quote */}
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <p
                        className="text-[10px] tracking-[0.4em] uppercase text-white/25 mb-5"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                    >
                        Welcome back
                    </p>
                    <h2
                        className="text-5xl xl:text-6xl leading-[1] tracking-tighter text-white font-extrabold"
                    >
                        Scent is
                        <br />
                        <em className="text-white/25" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
                            memory.
                        </em>
                    </h2>
                    <p
                        className="mt-6 text-sm text-white/40 leading-relaxed max-w-xs"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                    >
                        Sign in to access your orders, wishlist, and curated recommendations.
                    </p>
                </motion.div>

                {/* Bottom — decorative monogram */}
                <div
                    className="absolute bottom-0 right-0 text-[22vw] lg:text-[18vw] leading-none text-white/[0.03] font-extrabold pointer-events-none select-none"
                    aria-hidden="true"
                >
                    ES
                </div>

                {/* Bottom left — small tagline */}
                <motion.p
                    className="text-[10px] tracking-[0.25em] uppercase text-white/20 relative z-10"
                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Authentic European Fragrances · Philippines
                </motion.p>
            </div>

            {/* ── Right panel — form ── */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 py-16">
                {/* Mobile brand */}
                <div className="lg:hidden mb-12">
                    <Link to="/" className="flex flex-col leading-none">
                        <span
                            className="text-[10px] tracking-[0.45em] uppercase text-[#1f1f1f]/30"
                            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                        >
                            Euroscent
                        </span>
                        <span className="text-xl tracking-[0.06em] text-[#1f1f1f] font-extrabold">
                            Agency Shop
                        </span>
                    </Link>
                </div>

                <div className="max-w-sm w-full mx-auto">
                    {/* Heading */}
                    <motion.div className="mb-10" {...fadeUp(0)}>
                        <p
                            className="text-[10px] tracking-[0.35em] uppercase text-[#1f1f1f]/35 mb-2"
                            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                        >
                            Welcome back
                        </p>
                        <h1
                            className="text-3xl tracking-tight text-[#1f1f1f] font-bold"
                        >
                            Sign in to your
                            <br />
                            <span className="text-[#1f1f1f]/25 italic font-bold">account</span>
                        </h1>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Email */}
                        {/* Username */}
                        <motion.div {...fadeUp(0.1)}>
                            <label
                                className="block text-[10px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2"
                                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                            >
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                                placeholder="admin"
                                className="w-full border-b border-[#1f1f1f]/15 bg-transparent py-3 text-sm text-[#1f1f1f] placeholder:text-[#1f1f1f]/25 focus:outline-none focus:border-[#1f1f1f]/60 transition-colors duration-200"
                                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                            />
                        </motion.div>

                        {/* Password */}
                        <motion.div {...fadeUp(0.18)}>
                            <div className="flex justify-between items-center mb-2">
                                <label
                                    className="text-[10px] tracking-[0.25em] uppercase text-[#1f1f1f]/40"
                                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                                >
                                    Password
                                </label>
                                <a
                                    href="/forgot-password"
                                    className="text-[10px] tracking-[0.15em] uppercase text-[#1f1f1f]/35 hover:text-[#1f1f1f] transition-colors"
                                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                                >
                                    Forgot?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="w-full border-b border-[#1f1f1f]/15 bg-transparent py-3 text-sm text-[#1f1f1f] placeholder:text-[#1f1f1f]/25 focus:outline-none focus:border-[#1f1f1f]/60 transition-colors duration-200 pr-10"
                                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1f1f1f]/30 hover:text-[#1f1f1f]/60 transition-colors"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        {/* Submit */}
                        <motion.div className="pt-4" {...fadeUp(0.26)}>
                            <button
                                type="submit"
                                className="w-full py-4 bg-[#1f1f1f] text-white text-xs tracking-[0.3em] uppercase hover:bg-[#1f1f1f]/80 transition-colors duration-200"
                                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
                            >
                                Sign In
                            </button>
                        </motion.div>
                    </form>

                    {/* Divider */}
                    <motion.div className="flex items-center gap-4 my-8" {...fadeUp(0.32)}>
                        <div className="flex-1 h-px bg-[#1f1f1f]/10" />
                        <span
                            className="text-[10px] tracking-[0.2em] uppercase text-[#1f1f1f]/25"
                            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                        >
                            or
                        </span>
                        <div className="flex-1 h-px bg-[#1f1f1f]/10" />
                    </motion.div>

                    {/* Sign up link */}
                    <motion.p
                        className="text-center text-xs text-[#1f1f1f]/40"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                        {...fadeUp(0.38)}
                    >
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#1f1f1f] font-semibold tracking-wide hover:opacity-60 transition-opacity"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                            Create one
                        </Link>
                    </motion.p>
                </div>
            </div>
        </div>
    );
}
