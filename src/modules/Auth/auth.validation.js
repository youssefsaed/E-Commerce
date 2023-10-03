import Joi from 'joi';

export const signUpSchema={
    body:Joi.object().required().keys({
        name:Joi.string().min(2).max(20).required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp('[A-Za-z0-9]{5,20}')).required(),
        rePassword:Joi.string().valid(Joi.ref('password')).required(),
        phone:Joi.string().pattern(new RegExp('^0(10|11|12|15)[0-9]{8}$')).required()
    })
}
export const signInSchema={
    body:Joi.object().required().keys({
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp('[A-Za-z0-9]{5,20}')).required(),
    })
}