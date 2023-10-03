import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        required: true,
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    ratings: {
        type: Number,
        min: 1,
        max: 5
    }
}, { timestamps: true })

reviewSchema.pre(/^find/,function(){
    this.populate('user','name')
})
const reviewModal = mongoose.model('review', reviewSchema)

export default reviewModal