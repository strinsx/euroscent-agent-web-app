

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

