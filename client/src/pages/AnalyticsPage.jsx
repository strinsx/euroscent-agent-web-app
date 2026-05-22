import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
    delay,
  },
});

const STATUS_STYLES = {
  Delivered:
    "text-green-600 bg-green-50 border-green-200",

  Shipped:
    "text-blue-600 bg-blue-50 border-blue-200",

  Processing:
    "text-amber-600 bg-amber-50 border-amber-200",
};

function SparkBar({
  values,
  color = "#1f1f1f",
}) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex items-end gap-0.5 h-10">
      {values.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            background: color,
            opacity:
              i === values.length - 1
                ? 1
                : 0.2 +
                (i / values.length) *
                0.6,
          }}
          initial={{ height: 0 }}
          animate={{
            height: `${(v / max) * 100
              }%`,
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const navigate = useNavigate();

  const user =
    localStorage.getItem("user") ||
    "Admin";

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  const [products, setProducts] =
    useState([]);

  const [orders, setOrders] = useState(
    []
  );

  const [loading, setLoading] =
    useState(true);

  // FETCH DATA
  useEffect(() => {
    async function fetchData() {
      try {
        const token =
          localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [productsRes, ordersRes] = await Promise.all([
          fetch("https://euroscent-agent-web-app-server.onrender.com/api/products", { headers }), // ← your products route
          fetch("https://euroscent-agent-web-app-server.onrender.com/api/get-all-orders", { headers }), // ← correct route
        ]);

        // TOKEN EXPIRED
        if (
          productsRes.status === 401 ||
          ordersRes.status === 401
        ) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          navigate(
            "/login"
          );

          return;
        }

        const productsData =
          await productsRes.json();

        const ordersData =
          await ordersRes.json();
        setProducts(productsData.products || productsData || []);
        setOrders(ordersData.orders || ordersData || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // TOTAL REVENUE
  const totalRevenue = useMemo(() => {
    return orders.reduce(
      (sum, order) =>
        sum + order.totalPrice,
      0
    );
  }, [orders]);

  // AVG ORDER VALUE
  const avgOrderValue = useMemo(() => {
    if (orders.length === 0) return 0;

    return (
      totalRevenue / orders.length
    );
  }, [orders, totalRevenue]);

  // MONTHLY REVENUE
  const monthlyRevenue =
    useMemo(() => {
      const months = Array(12).fill(0);

      orders.forEach((order) => {
        const date = new Date(
          order.createdAt
        );

        const month =
          date.getMonth();

        months[month] +=
          order.totalPrice;
      });

      return months;
    }, [orders]);

  // MONTHLY ORDERS
  const monthlyOrders =
    useMemo(() => {
      const months = Array(12).fill(0);

      orders.forEach((order) => {
        const date = new Date(
          order.createdAt
        );

        const month =
          date.getMonth();

        months[month] += 1;
      });

      return months;
    }, [orders]);

  // TOP PRODUCTS
const topProducts = useMemo(() => {
  const counter = {};

  orders.forEach((order) => {
    order.products?.forEach((item) => {   // was order.product
      const id = item.productId?._id      // populated object
        ?? item.productId;                // raw ObjectId string

      if (!counter[id]) counter[id] = { sold: 0, name: item.productName };
      counter[id].sold += item.quantity;
    });
  });

  return products
    .map((product) => {
      const id = product._id || product.id;
      return {
        ...product,
        sold: counter[id]?.sold || 0,
      };
    })
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);
}, [orders, products]);

  // LOW STOCK
  const lowStockProducts =
    useMemo(() => {
      return products.filter(
        (p) => p.stock <= 10
      );
    }, [products]);

  // RECENT ORDERS
  const recentOrders = useMemo(() => {
    return [...orders]
      .reverse()
      .slice(0, 6);
  }, [orders]);

  const stats = [
    {
      label: "Total Revenue",
      value: `₱${totalRevenue.toLocaleString()}`,
      sub: `${orders.length} total orders`,
      positive: true,
    },

    {
      label: "Orders",
      value: `${orders.length}`,
      sub: "All-time orders",
      positive: true,
    },

    {
      label: "Active Listings",
      value: `${products.length}`,
      sub: `${lowStockProducts.length} low stock`,
      positive: false,
    },

    {
      label: "Avg. Order Value",
      value: `₱${Math.round(
        avgOrderValue
      ).toLocaleString()}`,
      sub: "Per transaction",
      positive: true,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-[#1f1f1f]/40">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-[#1f1f1f]">

      {/* TOP BAR */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#1f1f1f] h-14 flex items-center justify-between px-6 md:px-12">

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>

            <span className="text-[10px] tracking-[0.25em] uppercase">
              Back to Shop
            </span>
          </Link>

          <div className="w-px h-4 bg-white/10" />

          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-5">

          <Link
            to="/create-listing"
            className="flex items-center gap-2 px-4 py-1.5 border border-white/20 text-[10px] tracking-[0.2em] uppercase text-white/70 hover:border-white/50 hover:text-white transition-colors"
          >
            Create Listing
          </Link>

          <div className="flex items-center gap-2">

            <div className="w-6 h-6 bg-white/10 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">
                {user[0].toUpperCase()}
              </span>
            </div>

            <span className="text-[10px] text-white/40 hidden md:block">
              {user}
            </span>

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
          {...fadeUp(0)}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#1f1f1f]/30 mb-2">
            Euroscent Agency Shop
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Admin{" "}
            <span className="text-[#1f1f1f]/20 italic">
              Dashboard
            </span>
          </h1>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

          {stats.map((stat, i) => (
            <motion.div
              key={i}
              {...fadeUp(
                0.05 + i * 0.07
              )}
              className="border border-[#1f1f1f]/[0.08] p-5"
            >
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35 mb-3">
                {stat.label}
              </p>

              <p className="text-2xl font-bold tracking-tight mb-1">
                {stat.value}
              </p>

              <p
                className={`text-[10px] ${stat.positive
                  ? "text-green-600"
                  : "text-amber-500"
                  }`}
              >
                {stat.sub}
              </p>
            </motion.div>
          ))}

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">

          <motion.div
            {...fadeUp(0.2)}
            className="border border-[#1f1f1f]/[0.08] p-6"
          >
            <div className="mb-6">
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35 mb-1">
                Monthly Revenue
              </p>

              <p className="text-2xl font-bold">
                ₱
                {totalRevenue.toLocaleString()}
              </p>
            </div>

            <SparkBar
              values={monthlyRevenue}
            />
          </motion.div>

          <motion.div
            {...fadeUp(0.25)}
            className="border border-[#1f1f1f]/[0.08] p-6"
          >
            <div className="mb-6">
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35 mb-1">
                Monthly Orders
              </p>

              <p className="text-2xl font-bold">
                {orders.length}
              </p>
            </div>

            <SparkBar
              values={monthlyOrders}
              color="#4b6bfb"
            />
          </motion.div>

        </div>

        {/* TOP PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

          <motion.div
            {...fadeUp(0.3)}
            className="border border-[#1f1f1f]/[0.08] p-6"
          >
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35 mb-5">
              Top Products
            </p>

            <div className="space-y-4">
              {topProducts.map(
                (product, i) => (
                  <div
                    key={
                      product._id ||
                      product.id
                    }
                    className="flex items-center gap-3"
                  >
                    <span className="text-[10px] text-[#1f1f1f]/20 w-4">
                      {i + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">
                        {product.name}
                      </p>

                      <p className="text-[9px] text-[#1f1f1f]/30">
                        {product.sold} sold
                      </p>
                    </div>

                    <span className="text-xs text-[#1f1f1f]/60">
                      ₱
                      {product.price?.toLocaleString()}
                    </span>
                  </div>
                )
              )}
            </div>

          </motion.div>

          {/* LOW STOCK */}
          <motion.div
            {...fadeUp(0.35)}
            className="md:col-span-2 border border-[#1f1f1f]/[0.08] p-6"
          >
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35 mb-5">
              Inventory Alerts
            </p>

            <div className="space-y-3">
              {lowStockProducts.map(
                (p) => (
                  <div
                    key={
                      p._id || p.id
                    }
                    className="flex items-center justify-between py-2 border-b border-[#1f1f1f]/[0.05]"
                  >
                    <div>
                      <p className="text-xs font-semibold">
                        {p.name}
                      </p>

                      <p className="text-[9px] text-[#1f1f1f]/35">
                        {p.house}
                      </p>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 border border-amber-200 text-amber-600 bg-amber-50">
                      {p.stock} left
                    </span>

                  </div>
                )
              )}
            </div>
          </motion.div>

        </div>

        {/* RECENT ORDERS */}
        <motion.div
          {...fadeUp(0.4)}
          className="border border-[#1f1f1f]/[0.08] mb-16"
        >

          <div className="px-6 py-4 border-b border-[#1f1f1f]/[0.06]">
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#1f1f1f]/35">
              Recent Orders
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-[#1f1f1f]/[0.04]">
                  {[
                    "Customer",
                    "Total",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 text-[9px] tracking-[0.25em] uppercase text-[#1f1f1f]/25"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {recentOrders.map(
                  (order, i) => (
                    <motion.tr
                      key={order._id}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay:
                          0.45 +
                          i * 0.05,
                      }}
                      className="border-b border-[#1f1f1f]/[0.04]"
                    >
                      <td className="px-6 py-4 text-xs">
                        {order.name}
                      </td>

                      <td className="px-6 py-4 text-xs font-semibold">
                        ₱
                        {order.totalPrice?.toLocaleString()}
                      </td>

                     
                    </motion.tr>
                  )
                )}
              </tbody>

            </table>

          </div>
        </motion.div>
      </div>
    </div>
  );
}