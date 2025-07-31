import Joi from "joi";



export const addSubCategorySchema = Joi.object({
    name: Joi.string().min(2).max(30).trim().lowercase().required(),
    category:Joi.string().hex().length(24).required()
})

export const updateSubCategorySchema = Joi.object({
    name: Joi.string().min(2).max(30).trim().lowercase(),
    category:Joi.string().hex().length(24),
    id:Joi.string().hex().length(24).required()
})

export const subCategorySchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})
