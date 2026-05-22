import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    stock: { type: Number, default: 1 },
    size: { type: Number, default: 60 },
    category: { type: String, default: "Oriental" },
    gender: { type: String, default: "Unisex" },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);