import Joi from "joi";



export const updateUserSchema={
    body:Joi.object().keys({
        name:Joi.string().min(2).max(20),
        phone:Joi.string().pattern(new RegExp('^0(10|11|12|15)[0-9]{8}$'))
    }),
}

export const changePasswordSchema={
    body:Joi.object().keys({
        password:Joi.string().pattern(new RegExp('[A-Za-z0-9]{5,20}')).required(), 
    })
}

export const userSchema = {
    params: Joi.object().keys({
        id: Joi.string().hex().length(24).required()
    })
}