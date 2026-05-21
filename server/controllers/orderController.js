import Order from "../models/orderSchema.js";

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, name, email, phone } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order." });
    }
    if (!name) {
      return res.status(400).json({ message: "Buyer name is required." });
    }

    const order = await Order.create({
      product: products.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      })),
      totalPrice,
      name,
      phone,
      email
    });

    res.status(201).json({ message: "Order placed successfully.", order });
  } catch (error) {
    console.error("createOrder error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// GET /api/orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("product.product", "title price size images");
    res.status(200).json(orders);
  } catch (error) {
    console.error("getAllOrders error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};