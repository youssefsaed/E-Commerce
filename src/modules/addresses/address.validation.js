import Joi from "joi";



export const addAddressSchema = Joi.object({
    city: Joi.string().trim().max(20).required(),
    street: Joi.string().trim().max(200).required(),
    phone: Joi.string().pattern(new RegExp('^0(10|11|12|15)[0-9]{8}$')).required()
})
export const removeAddressSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

