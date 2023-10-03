import Joi from "joi";



export const addReviewSchema={
    body:Joi.object().keys({
        comment:Joi.string().min(2).max(300).required(),
        ratings:Joi.number().min(1).max(5).required(),
        product:Joi.string().hex().length(24).required()
    }),
}

export const updateReviewSchema = {
    body:Joi.object().keys({
        comment:Joi.string().min(2).max(300),
        ratings:Joi.number().min(1).max(5),
        product:Joi.string().hex().length(24)
    }),
    params: Joi.object().keys({
        id: Joi.string().hex().length(24).required()
    })
}

export const reviewSchema = {
    params: Joi.object().keys({
        id: Joi.string().hex().length(24).required()
    })
}