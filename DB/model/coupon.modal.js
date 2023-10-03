import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: [true, 'coupon is required'],
        trim: true,
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        required: [true, 'coupon discount required']
    },
    expires: {
        type: Date,
        required: [true, 'coupon date required']
    },

}, { timestamps: true })

couponSchema.post('init', (doc) => {
    doc.logo = process.env.BASE_URL + 'coupon/' + doc.logo
})

const couponModal = mongoose.model('coupon', couponSchema)

export default couponModal