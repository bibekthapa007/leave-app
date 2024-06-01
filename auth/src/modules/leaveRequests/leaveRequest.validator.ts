import Joi from 'joi';

export const createLeaveRequestSchema = Joi.object({
  leaveTypeId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  managerId: Joi.number().integer().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  status: Joi.string().required(),
  leaveDays: Joi.number().integer().required(),
  reason: Joi.string().required(),
});

export const updateLeaveRequestSchema = Joi.object({
  leaveTypeId: Joi.number().integer(),
  userId: Joi.number().integer(),
  managerId: Joi.number().integer(),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  status: Joi.string(),
  leaveDays: Joi.number().integer(),
  reason: Joi.string(),
});
