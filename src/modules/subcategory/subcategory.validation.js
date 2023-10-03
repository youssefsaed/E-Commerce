import Joi from "joi";


export const addSubCategorySchema={
    body:Joi.object().keys({
        name:Joi.string().min(2).max(50).required(),
        category:Joi.string().hex().length(24).required()
    })
}
export const updateSubCategorySchema={
    body:Joi.object().keys({
        name:Joi.string().min(2).max(50),
        category:Joi.string().hex().length(24)
    }),
    params:Joi.object().keys({
        id:Joi.string().hex().length(24).required()
    })
}
export const subCategorySchema={
    params:Joi.object().keys({
        id:Joi.string().hex().length(24).required()
    })
}