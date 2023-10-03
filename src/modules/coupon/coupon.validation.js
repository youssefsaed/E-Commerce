import Joi from "joi";

// Joi.string().pattern(new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$'))

export const addcouponSchema = {
    body: Joi.object().keys({
        code: Joi.string().min(6).max(6).required(),
        discount: Joi.number().required(),
        expires:Joi.date().required()
    })
}
export const updatecouponSchema = {
    body: Joi.object().keys({
        code: Joi.string().min(6).max(6),
        discount: Joi.number(),
        expires:Joi.date()
    }),
    params: Joi.object().keys({
        id: Joi.string().hex().length(24).required()
    })
}
export const couponSchema = {
    params: Joi.object().keys({
        id: Joi.string().hex().length(24).required()
    })
}