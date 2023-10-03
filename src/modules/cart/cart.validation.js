import Joi from "joi";


export const addCartSchema={
    body:Joi.object().keys({
        product:Joi.string().hex().length(24).required(),
        quantity:Joi.number()
    })
}
export const updateCartSchema={
    body:Joi.object().keys({
        quantity:Joi.number()
    }),
    params:Joi.object().keys({
        id:Joi.string().hex().length(24).required()
    })
}
export const CartSchema={
    params:Joi.object().keys({
        id:Joi.string().hex().length(24).required()
    })
}