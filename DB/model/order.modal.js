import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    cartItems: [{
        product: { type: mongoose.Types.ObjectId, ref: 'product' },
        quantity: Number,
        price: Number
    }],
    totalOrderPrice: Number,
    shippingAddress: {
        street: String,
        city: String,
        phone: String
    },
    isArrive: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    payment: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    }




}, { timestamps: true })



const orderModal = mongoose.model('order', orderSchema)

export default orderModal