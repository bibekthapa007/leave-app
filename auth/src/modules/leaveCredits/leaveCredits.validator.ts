import Joi from 'joi';

export const createLeaveCreditSchema = Joi.object({
  leaveTypeId: Joi.number().required(),
  userId: Joi.number().required(),
  defaultDays: Joi.number().required(),
  maxDays: Joi.number().required(),
});

export const updateLeaveCreditSchema = Joi.object({
  leaveTypeId: Joi.number(),
  userId: Joi.number(),
  defaultDays: Joi.number(),
  maxDays: Joi.number(),
});
