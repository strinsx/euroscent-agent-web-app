import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../constants/data";
import ProtectedRoute from '../constants/protectedrouting'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

// Mock analytics data
const STATS = [
  { label: "Total Revenue", value: "₱284,500", sub: "+12.4% this month", positive: true },
  { label: "Orders", value: "94", sub: "+8 this week", positive: true },
  { label: "Active Listings", value: `${PRODUCTS.length}`, sub: "2 low stock", positive: false },
  { label: "Avg. Order Value", value: "₱3,026", sub: "+₱240 vs last month", positive: true },
];

const RECENT_ORDERS = [
  { id: "ORD-0091", customer: "Maria S.", product: "Nuit Dorée · 100ml", total: 4800, status: "Delivered" },
  { id: "ORD-0090", customer: "James L.", product: "Opéra Rouge · 50ml", total: 5200, status: "Shipped" },
  { id: "ORD-0089", customer: "Ana R.", product: "Sel de Mer · 150ml", total: 3100, status: "Processing" },
  { id: "ORD-0088", customer: "Mark T.", product: "Blanc de Soie · 30ml + Forêt Noire · 50ml", total: 7800, status: "Delivered" },
  { id: "ORD-0087", customer: "Carla M.", product: "Velours Sucré · 50ml", total: 3800, status: "Shipped" },
];

const STATUS_STYLES = {
  Delivered: "text-green-600 bg-green-50 border-green-200",
  Shipped: "text-blue-600 bg-blue-50 border-blue-200",
  Processing: "text-amber-600 bg-amber-50 border-amber-200",
};

// Mini sparkline bar chart
function SparkBar({ values, color = "#1f1f1f" }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-0.5 h-10">
      {values.map((v, i) => (
        <motion.div key={i} className="flex-1 rounded-sm"
          style={{ background: color, opacity: i === values.length - 1 ? 1 : 0.2 + (i / values.length) * 0.6 }}
          initial={{ height: 0 }} animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }} />
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const user = localStorage.getItem("user") || "null";
const logout = () => { localStorage.removeItem("user"); window.location.href = "/"; localStorage.removeItem("token") };
ProtectedRoute();


  const revenueData = [12000, 18500, 14200, 22000, 19800, 26000, 31500, 28400, 34200, 29800, 38000, 41200];
  const ordersData  = [8, 13, 10, 17, 14, 19, 22, 20, 25, 21, 28, 30];

  return (
    <div className="bg-white min-h-screen text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif" }}>

      {/* Admin top bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#1f1f1f] h-14 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M5 12l7-7M5 12l7 7" /></svg>
            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Back to Shop</span>
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Dashboard</span>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/create-listing"
            className="flex items-center gap-2 px-4 py-1.5 border border-white/20 text-[10px] tracking-[0.2em] uppercase text-white/70 hover:border-white/50 hover:text-white transition-colors"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            Create Listing
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">{(user || "A")[0].toUpperCase()}</span>
            </div>
            <span className="text-[10px] text-white/40 hidden md:block" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
              {user || "Admin"}
            </span>
          </div>
          <button onClick={logout} className="text-[10px] tracking-[0.2em] uppercase text-white/25 hover:text-red-400 transition-colors"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Sign Out</button>
        </div>
      </header>

      <div className="pt-14 px-6 md:px-12">

        {/* Page heading */}
        <motion.div className="py-12" {...fadeUp(0)}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#1f1f1f]/30 mb-2" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
            Euroscent Agency Shop
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Admin <span className="text-[#1f1f1f]/20 italic">Dashboard</span>
          </h1>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map((stat, i) => (
            <motion.div key={i} {...fadeUp(0.05 + i * 0.07)}
              className="border border-[#1f1f1f]/[0.08] p-5">
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35 mb-3" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight mb-1">{stat.value}</p>
              <p className={`text-[10px] ${stat.positive ? "text-green-600" : "text-amber-500"}`}
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Revenue chart */}
          <motion.div {...fadeUp(0.2)} className="border border-[#1f1f1f]/[0.08] p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35 mb-1" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Monthly Revenue</p>
                <p className="text-2xl font-bold">₱284,500</p>
              </div>
              <span className="text-[9px] tracking-[0.15em] uppercase text-green-600 bg-green-50 border border-green-200 px-2 py-1"
                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>+12.4%</span>
            </div>
            <SparkBar values={revenueData} color="#1f1f1f" />
            <div className="flex justify-between mt-2">
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                <span key={m} className="text-[8px] text-[#1f1f1f]/20" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{m}</span>
              ))}
            </div>
          </motion.div>

          {/* Orders chart */}
          <motion.div {...fadeUp(0.25)} className="border border-[#1f1f1f]/[0.08] p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35 mb-1" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Monthly Orders</p>
                <p className="text-2xl font-bold">94</p>
              </div>
              <span className="text-[9px] tracking-[0.15em] uppercase text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1"
                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>+8 this week</span>
            </div>
            <SparkBar values={ordersData} color="#4b6bfb" />
            <div className="flex justify-between mt-2">
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                <span key={m} className="text-[8px] text-[#1f1f1f]/20" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{m}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <motion.div {...fadeUp(0.3)} className="md:col-span-1 border border-[#1f1f1f]/[0.08] p-6">
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35 mb-5" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Top Products</p>
            <div className="space-y-4">
              {PRODUCTS.sort((a, b) => b.reviews - a.reviews).slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-[10px] text-[#1f1f1f]/20 w-4 flex-shrink-0" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1f1f1f] truncate" style={{ fontFamily: "Manrope, sans-serif" }}>{p.name}</p>
                    <p className="text-[9px] text-[#1f1f1f]/30" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{p.reviews} reviews</p>
                  </div>
                  <span className="text-xs text-[#1f1f1f]/60 flex-shrink-0" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>₱{p.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Low stock alert */}
          <motion.div {...fadeUp(0.35)} className="md:col-span-2 border border-[#1f1f1f]/[0.08] p-6">
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35 mb-5" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Inventory Alerts</p>
            <div className="space-y-3">
              {PRODUCTS.filter((p) => p.stock <= 10).map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-[#1f1f1f]/[0.05]">
                  <div>
                    <p className="text-xs font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>{p.name}</p>
                    <p className="text-[9px] text-[#1f1f1f]/35" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{p.house}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1 bg-[#1f1f1f]/10 relative overflow-hidden rounded">
                      <div className="absolute inset-y-0 left-0 bg-amber-400 rounded"
                        style={{ width: `${(p.stock / 20) * 100}%` }} />
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 border ${p.stock <= 5 ? "border-red-200 text-red-500 bg-red-50" : "border-amber-200 text-amber-600 bg-amber-50"}`}
                      style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>
                      {p.stock} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent orders */}
        <motion.div {...fadeUp(0.4)} className="border border-[#1f1f1f]/[0.08] mb-16">
          <div className="px-6 py-4 border-b border-[#1f1f1f]/[0.06] flex items-center justify-between">
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Recent Orders</p>
            <span className="text-[10px] text-[#1f1f1f]/30 tracking-[0.15em] uppercase" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Last 7 days</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]/[0.04]">
                  {["Order", "Customer", "Product", "Total", "Status"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/25"
                      style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((order, i) => (
                  <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 + i * 0.05 }}
                    className="border-b border-[#1f1f1f]/[0.04] hover:bg-[#1f1f1f]/[0.01] transition-colors">
                    <td className="px-6 py-4 text-xs font-semibold text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif" }}>{order.id}</td>
                    <td className="px-6 py-4 text-xs text-[#1f1f1f]/60" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{order.customer}</td>
                    <td className="px-6 py-4 text-xs text-[#1f1f1f]/50 max-w-xs truncate" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>{order.product}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-[#1f1f1f]" style={{ fontFamily: "Manrope, sans-serif" }}>₱{order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border ${STATUS_STYLES[order.status]}`}
                        style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}>{order.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
