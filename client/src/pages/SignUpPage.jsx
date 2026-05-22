import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { signUpToken } from "../constants/token";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function SignUpPage() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        confirm: "",
        token: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        setIsLoading(true);

        if (!signUpToken) {
            alert('No Token Provided');
            return;
        }

        if (form.password !== form.confirm) {
            alert('Passwords do not match!');
            return;
        }

        if (form.token !== signUpToken) {
            alert('Token is invalid!');
            return;
        }

        // artificial loading delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const response = await fetch(
            'https://euroscent-agent-web-app-server.onrender.com/api/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                }),
            }
        );

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create account');
        }

        alert('Account created successfully!');

        setForm({
            username: "",
            password: "",
            confirm: "",
            token: "",
        });

    } catch (error) {

        console.error(error);

        alert(error.message);

    } finally {

        setIsLoading(false);

    }
};
    const strength = (() => {
        const p = form.password;
        if (!p) return 0;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
    const strengthColor = ["", "#ef4444", "#f59e0b", "#84cc16", "#22c55e"][strength];

    return (
        <div className="min-h-screen bg-white flex" style={{ fontFamily: "Manrope, sans-serif" }}>

            {/* ── Left panel — form ── */}
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
                            New here?
                        </p>
                        <h1 className="text-3xl tracking-tight text-[#1f1f1f] font-bold">
                            Create your
                            <br />
                            <span className="text-[#1f1f1f]/25 italic font-bold">account</span>
                        </h1>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <motion.div {...fadeUp(0.08)}>
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
                        <motion.div {...fadeUp(0.2)}>
                            <label
                                className="block text-[10px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2"
                                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                            >
                                Password
                            </label>
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

                            {/* Password strength meter */}
                            {form.password && (
                                <div className="mt-3">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="h-px flex-1 transition-all duration-300"
                                                style={{ background: i <= strength ? strengthColor : "#1f1f1f15" }}
                                            />
                                        ))}
                                    </div>
                                    <p
                                        className="text-[10px] tracking-[0.15em]"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontWeight: 300,
                                            color: strengthColor,
                                        }}
                                    >
                                        {strengthLabel}
                                    </p>
                                </div>
                            )}
                        </motion.div>

                        {/* Confirm password */}
                        <motion.div {...fadeUp(0.26)}>
                            <label
                                className="block text-[10px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2"
                                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                            >
                                Confirm Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirm"
                                value={form.confirm}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className={`w-full border-b bg-transparent py-3 text-sm text-[#1f1f1f] placeholder:text-[#1f1f1f]/25 focus:outline-none transition-colors duration-200 ${form.confirm && form.confirm !== form.password
                                    ? "border-red-400"
                                    : "border-[#1f1f1f]/15 focus:border-[#1f1f1f]/60"
                                    }`}
                                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                            />
                            {form.confirm && form.confirm !== form.password && (
                                <p
                                    className="mt-1.5 text-[10px] tracking-[0.1em] text-red-400"
                                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                                >
                                    Passwords do not match
                                </p>
                            )}
                        </motion.div>

                        <motion.div {...fadeUp(0.26)}>
                            <label
                                className="block text-[10px] tracking-[0.25em] uppercase text-[#1f1f1f]/40 mb-2"
                                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                            >
                                Token
                            </label>
                            <input
                                type="token"
                                name="token"
                                value={form.token}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full border-b bg-transparent py-3 text-sm text-[#1f1f1f] placeholder:text-[#1f1f1f]/25 focus:outline-none transition-colors duration-200 
                                        ? "border-red-400"
                                        : "border-[#1f1f1f]/15 focus:border-[#1f1f1f]/60"
                                    }`}
                                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                            />
                        </motion.div>

                        {/* Terms note */}
                        <motion.p
                            className="text-[10px] text-[#1f1f1f]/30 leading-relaxed"
                            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                            {...fadeUp(0.3)}
                        >
                            By creating an account you agree to our{" "}
                            <a href="/terms" className="underline underline-offset-2 hover:text-[#1f1f1f]/60 transition-colors">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="underline underline-offset-2 hover:text-[#1f1f1f]/60 transition-colors">
                                Privacy Policy
                            </a>.
                        </motion.p>

                        {/* Submit */}
                        <motion.div className="pt-2" {...fadeUp(0.34)}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-[#1f1f1f] text-white text-xs tracking-[0.3em] uppercase hover:bg-[#1f1f1f]/80 transition-colors duration-200"
                                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
                            >
                                {isLoading ? "CREATING" : "CREATE ACCOUNT"}
                            </button>
                        </motion.div>
                    </form>

                    {/* Divider */}
                    <motion.div className="flex items-center gap-4 my-8" {...fadeUp(0.4)}>
                        <div className="flex-1 h-px bg-[#1f1f1f]/10" />
                        <span
                            className="text-[10px] tracking-[0.2em] uppercase text-[#1f1f1f]/25"
                            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                        >
                            or
                        </span>
                        <div className="flex-1 h-px bg-[#1f1f1f]/10" />
                    </motion.div>

                    {/* Login link */}
                    <motion.p
                        className="text-center text-xs text-[#1f1f1f]/40"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                        {...fadeUp(0.44)}
                    >
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#1f1f1f] font-semibold tracking-wide hover:opacity-60 transition-opacity"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                            Sign in
                        </Link>
                    </motion.p>
                </div>
            </div>

            {/* ── Right panel — decorative ── */}
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="self-end"
                >
                    <Link to="/" className="flex flex-col leading-none items-end">
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

                {/* Middle — editorial */}
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
                        Join us
                    </p>
                    <h2 className="text-5xl xl:text-6xl leading-[1] tracking-tighter text-white font-extrabold">
                        Find your
                        <br />
                        <em className="text-white/25" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
                            signature.
                        </em>
                    </h2>
                    <p
                        className="mt-6 text-sm text-white/40 leading-relaxed max-w-xs"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                    >
                        Join thousands of fragrance lovers discovering rare European scents — delivered to the Philippines.
                    </p>

                    {/* Perks list */}
                    <ul className="mt-8 flex flex-col gap-3">
                        {[
                            "Early access to new arrivals",
                            "Exclusive member pricing",
                            "Order tracking & history",
                        ].map((perk, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-white/30" />
                                <span
                                    className="text-xs text-white/40"
                                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                                >
                                    {perk}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Decorative monogram */}
                <div
                    className="absolute bottom-0 left-0 text-[22vw] lg:text-[18vw] leading-none text-white/[0.03] font-extrabold pointer-events-none select-none"
                    aria-hidden="true"
                >
                    ES
                </div>

                {/* Bottom tagline */}
                <motion.p
                    className="text-[10px] tracking-[0.25em] uppercase text-white/20 relative z-10 self-end text-right"
                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Authentic European Fragrances · Philippines
                </motion.p>
            </div>
        </div>
    );
}
