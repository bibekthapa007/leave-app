import Joi from 'joi';

export const createLeaveTypeSchema = Joi.object({
  name: Joi.string().required(),
  default_days: Joi.number().required(),
  is_transferable: Joi.boolean().required(),
});

export const updateLeaveTypeSchema = Joi.object({
  name: Joi.string(),
  default_days: Joi.number(),
  is_transferable: Joi.boolean(),
});
