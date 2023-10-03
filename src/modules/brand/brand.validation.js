import Joi from "joi";


export const addBrandSchema={
    body:Joi.object().keys({
        name:Joi.string().min(2).max(15).required()
    })
}
export const updateBrandSchema={
    body:Joi.object().keys({
        name:Joi.string().min(2).max(15)
    }),
    params:Joi.object().keys({
        id:Joi.string().hex().length(24).required()
    })
}
export const brandSchema={
    params:Joi.object().keys({
        id:Joi.string().hex().length(24).required()
    })
}