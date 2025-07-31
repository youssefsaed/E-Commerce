import Joi from "joi";

export const addUserSchema = Joi.object({
    name: Joi.string().min(2).max(30).trim().lowercase().required(),
    email: Joi.string().trim().email().required(),
    role:Joi.string().trim().valid('admin','superAdmin').required(),
    password: Joi.string().pattern(new RegExp('[A-Za-z0-9]{5,20}')).required(),
    rePassword: Joi.string().valid(Joi.ref('password')).required(),
    phone: Joi.string().pattern(new RegExp('^0(10|11|12|15)[0-9]{8}$')).required()
})

export const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(30).trim().lowercase().required(),
    phone: Joi.string().pattern(new RegExp('^0(10|11|12|15)[0-9]{8}$'))
})

export const changePasswordSchema = Joi.object({
    password: Joi.string().pattern(new RegExp('[A-Za-z0-9]{5,20}')).required(),
})

export const userSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const forgetPasswordSchema = Joi.object({
    email: Joi.string().trim().email().required(),
})
export const resetPasswordSchema = Joi.object({
    code:Joi.string().trim().length(6).required(),
    password: Joi.string().pattern(new RegExp('[A-Za-z0-9]{5,20}')).required(),
    rePassword:Joi.string().valid(Joi.ref('password')).required(),
    token:Joi.string().required()
})
