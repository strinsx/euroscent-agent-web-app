

import Product from '../models/productSchema.js'


export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json({ products: products });
    console.log(products)
}

export const getProductId = async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log("Product found:", product); // ← and this
    res.json(product);
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("deleteProduct error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Product updated successfully.", product });
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};