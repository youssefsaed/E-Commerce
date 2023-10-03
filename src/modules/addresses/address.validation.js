import Joi from "joi";

export const addAddressSchema={
    body:Joi.object().keys({
        city:Joi.string().max(20).required(),
        street:Joi.string().max(50).required(),
        phone:Joi.string().pattern(new RegExp('^0(10|11|12|15)[0-9]{8}$')).required()
    })
}



export const removeAddressSchema = {
    params: Joi.object().keys({
        id: Joi.string().hex().length(24).required()
    })
}