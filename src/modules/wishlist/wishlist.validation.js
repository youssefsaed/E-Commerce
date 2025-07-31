import Joi from "joi";



export const wishlistSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})