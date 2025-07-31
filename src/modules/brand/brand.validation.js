import Joi from "joi";



export const addBrandSchema = Joi.object({
    name: Joi.string().min(2).max(20).trim().lowercase().required(),
})

export const updateBrandSchema = Joi.object({
    name: Joi.string().min(2).max(20).trim().lowercase().required(),
    id: Joi.string().hex().length(24).required()
})

export const brandSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

