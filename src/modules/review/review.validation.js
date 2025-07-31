import Joi from "joi";




export const addReviewSchema = Joi.object({
    comment: Joi.string().trim().min(2).max(300).required(),
    ratings: Joi.number().min(1).max(5).required(),
    product: Joi.string().hex().length(24).required()
})
export const updateReviewSchema = Joi.object({
    comment: Joi.string().trim().min(2).max(300).required(),
    ratings: Joi.number().min(1).max(5).required(),
    id: Joi.string().hex().length(24).required()
})
export const reviewSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})



