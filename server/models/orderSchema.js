


import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({

    product: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product"
            },
            
            quantity: Number
        }
    ],

    totalPrice: Number,

})

export default mongoose.model("Order", orderSchema);