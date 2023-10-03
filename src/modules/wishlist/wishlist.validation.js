import Joi from "joi";





export const wishlistSchema = {
    params: Joi.object().keys({
        id: Joi.string().hex().length(24).required()
    })
}