import Joi from "joi";



export const addProductSchema = Joi.object({
    title: Joi.string().min(2).max(200).trim().lowercase().required(),
    price: Joi.number().required(),
    priceAfterDiscount: Joi.number().required(),
    ratingAvg: Joi.number().min(1).max(5).required(),
    ratingCount: Joi.number().required(),
    description: Joi.string().min(5).max(5000).required(),
    quantity: Joi.number().required(),
    sold: Joi.number().required(),
    category: Joi.string().hex().length(24).required(),
    subCategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
})


export const updateProductSchema = Joi.object({
    title: Joi.string().min(2).max(200).trim().lowercase(),
    price: Joi.number(),
    priceAfterDiscount: Joi.number(),
    ratingAvg: Joi.number().min(1).max(5),
    ratingCount: Joi.number(),
    description: Joi.string().min(5).max(5000),
    quantity: Joi.number(),
    sold: Joi.number(),
    category: Joi.string().hex().length(24),
    subCategory: Joi.string().hex().length(24),
    brand: Joi.string().hex().length(24),
    id: Joi.string().hex().length(24).required()
})

export const productSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})








