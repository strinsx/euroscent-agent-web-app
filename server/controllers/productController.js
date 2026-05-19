

import Product from '../models/productSchema.js'


export const getProducts = async(req, res)=> {
    const products = await Product.find();
    res.json(products);
}

export const getProductId = async(req, res)=> {
    const product = await Product.findById(req.params.id);
    res.json(product);
};

