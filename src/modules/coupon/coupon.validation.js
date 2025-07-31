import Joi from "joi";

// Joi.string().pattern(new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$'))


export const addcouponSchema = Joi.object({
    code: Joi.string().trim().min(6).max(6).required(),
    discount: Joi.number().required(),
    expires: Joi.date().required()
})
export const updatecouponSchema = Joi.object({
    code: Joi.string().trim().min(6).max(6).required(),
    discount: Joi.number().required(),
    expires: Joi.date().required(),
    id: Joi.string().hex().length(24).required()
})
export const couponSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

