import Joi from "joi";

export const schema = {
    feedback: Joi.object().keys({
        name: Joi.string().required().min(3).max(20),
        location: Joi.string().required().min(2).max(20),
        comments: Joi.string().required().min(2).max(50),
    })
}