import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js"; // adjust path as needed

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, name, email, phone, address, paymentMethod } = req.body;

    if (!products || products.length === 0)
      return res.status(400).json({ message: "No products in order." });
    if (!name)
      return res.status(400).json({ message: "Buyer name is required." });

    const productIds = products.map((p) => p.productId);
    const productDocs = await Product.find({ _id: { $in: productIds } }).select("name");

    const nameMap = {};
    productDocs.forEach((p) => { nameMap[p._id.toString()] = p.name; });

    const order = await Order.create({
      products: products.map((item) => ({
        productId: item.productId,
        productName: nameMap[item.productId] || "Unknown Product",
        quantity: item.quantity,
      })),
      totalPrice,
      name,
      email,
      phone,
      address,
      paymentMethod,
    });

    res.status(201).json({ message: "Order placed successfully.", order });
  } catch (error) {
    console.error("createOrder error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// GET /api/get-all-orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productId", "name price images")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("getAllOrders error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};