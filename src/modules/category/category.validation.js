import Joi from "joi";


export const addCategorySchema = Joi.object({
    name: Joi.string().min(2).max(20).trim().lowercase().required(),
})

export const updateCategorySchema = Joi.object({
    name: Joi.string().min(2).max(20).trim().lowercase(),
    id: Joi.string().hex().length(24).required()
})

export const categorySchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})




