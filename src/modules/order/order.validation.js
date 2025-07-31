import Joi from "joi";



export const OrderSchema = Joi.object({
    street: Joi.string().trim().max(50).required(),
    city: Joi.string().trim().max(20).required(),
    phone: Joi.string().pattern(new RegExp('^(010|011|015|012)[0-9]{8}$')).required(),
    id: Joi.string().hex().length(24).required()
})
export const cancelOrderScehma = Joi.object({
    id: Joi.string().hex().length(24).required()
})

