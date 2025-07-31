import productModal from "../../../DB/model/product.modal.js"
import reviewModal from "../../../DB/model/review.modal.js"
import AppError from "../../utils/appError.js"
import Refactor from "../handler/reFactor.js"



const addReview = async (req, res, next) => {
    req.body.user = req.user.id
    const product = await productModal.findById(req.body.product)
    if (!product) return next(new AppError('product not found', 404))
    const isReview = await reviewModal.findOne({ user: req.user.id, product: req.body.product })
    if (isReview) return next(new AppError('you already review', 409))
    const newReview = new reviewModal(req.body)
    const review = await newReview.save()
    return res.status(201).json({ message: 'success', review })
}

const updateReview = async (req, res, next) => {
    const { id } = req.params
    const result = await reviewModal.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new: true })
    if (!result) return next(new AppError('Review not found', 404))
        return res.status(200).json({ message: 'success', result })
}

const deleteReview = async (req, res, next) => {
    const { id } = req.params
    const review = await reviewModal.findOneAndDelete({ _id: id, user: req.user.id })
    if (!review) return next(new AppError('Review not found', 404))
        return res.status(200).json({ message: 'success' })
}

const getAllReview = new Refactor(reviewModal).getAll()
const getReview = new Refactor(reviewModal,'Review not found').getSpecificDocument()

export {
    addReview,
    getAllReview,
    getReview,
    updateReview,
    deleteReview,
}