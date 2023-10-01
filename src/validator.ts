import Joi from "joi";

export const validateRequest = (input: object, schema: Joi.ObjectSchema<any>) => {
  return schema.validate(input);
};