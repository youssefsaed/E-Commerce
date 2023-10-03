import { ApiFeatures } from "../../utils/ApiFeatures.js"
import productModal from "../../../DB/model/product.modal.js"
import reviewModal from "../../../DB/model/review.modal.js"



const addReview = async (req, res, next) => {
    req.body.user = req.user.id
    const check = await productModal.findById(req.body.product)
    if (!check) return next(new Error('product not found'))
    const isReview = await reviewModal.findOne({ user: req.user.id, product: req.body.product })
    if (isReview) return next(new Error('you already review'))
    const newReview = new reviewModal(req.body)
    const review = await newReview.save()
    await productModal.updateOne({ _id: req.body.product }, {
        $push: {
            reviews: review._id
        }
    })
    return res.json({ message: 'success', review })
}

const getAllReview = async (req, res, next) => {
    const apiFeatures = new ApiFeatures(reviewModal.find({}), req.query)
        .paginate().filter().sort().search().fields()
    const Reviews = await apiFeatures.reuseQuery
    return res.json({ message: 'success', Reviews })
}


const getReview = async (req, res, next) => {
    const Review = await reviewModal.findById(req.params.id)
    if (!Review) return next(new Error('Review not found', { cause: 404 }))
    return res.json({ message: 'success', Review })
}

const updateReview = async (req, res, next) => {
    const { id } = req.params
    const result = await reviewModal.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new: true })
    if (!result) return next(new Error('Review not found', { cause: 404 }))
    return res.status(200).json({ message: 'success', result })
}

const deleteReview = async (req, res, next) => {
    const { id } = req.params
    const review = await reviewModal.findOne({ _id: id, user: req.user.id })
    if (!review) return next(new Error('Review not found', { cause: 404 }))
    await productModal.updateOne({}, {
        $pull: {
            reviews: review._id
        }
    })
    await reviewModal.deleteOne({ _id: id, user: req.user.id })
    return res.json({ message: 'success' })
}


export {
    addReview,
    getAllReview,
    getReview,
    updateReview,
    deleteReview,
}