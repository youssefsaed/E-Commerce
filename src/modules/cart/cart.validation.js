import Joi from "joi";



export const addCartSchema = Joi.object({
    product: Joi.string().hex().length(24).required(),
    quantity: Joi.number()
})
export const updateCartSchema = Joi.object({
    quantity: Joi.number(),
    id: Joi.string().hex().length(24).required()
})
export const CartSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

