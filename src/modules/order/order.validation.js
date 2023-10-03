import Joi from "joi";


export const OrderSchema={
    body:Joi.object().keys({
        shippingAddress:Joi.object().required().keys({
            street:Joi.string().max(50).required(),
            city:Joi.string().max(20).required(),
            phone:Joi.string().pattern(new RegExp('^(010|011|015|012)[0-9]{8}$')).required()
        }),
    }),
    params:Joi.object().keys({
        id:Joi.string().hex().length(24).required()
    })
}
export const cancelOrderScehma={
    params:Joi.object().keys({
        id:Joi.string().hex().length(24).required()
    })
}

