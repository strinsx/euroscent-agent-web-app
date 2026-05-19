

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    title: {String, required: true}, 
    desc: {String, required: true},
    price: {Number, required: true},
    image: {String, required: false},
    stock: {Number, default: 1},

    
})

export default mongoose.model("Product", productSchema);