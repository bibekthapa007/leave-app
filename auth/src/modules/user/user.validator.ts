import Joi from 'joi';

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  countryId: Joi.number().required(),
  department: Joi.string().required(),
  designationId: Joi.number().required(),
  password: Joi.string().min(8).max(20).required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
});
