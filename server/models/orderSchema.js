import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      productName: String,
      quantity: Number,
    }
  ],
  totalPrice: Number,
  name: String,
  email: String,
  phone: String,        
  address: String,
  paymentMethod: String,
}, { timestamps: true }); 

export default mongoose.model("Order", orderSchema);