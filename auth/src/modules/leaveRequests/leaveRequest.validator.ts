import JoiDate from '@joi/date';
import RawJoi from 'joi';

import { LeaveStatusEnum } from '@/types/leave';

import { YYYY_MM_DD } from '@/constants/date';

const Joi = RawJoi.extend(JoiDate);

export const createLeaveRequestSchema = Joi.object({
  leaveTypeId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  startDate: Joi.date().format(YYYY_MM_DD).raw().required(),
  endDate: Joi.date().format(YYYY_MM_DD).raw().required().greater(Joi.ref('startDate')),
  status: Joi.string()
    .valid(...Object.values(LeaveStatusEnum))
    .default(LeaveStatusEnum.PENDING),
  leaveDays: Joi.number().integer().required(),
  reason: Joi.string().required(),
  fiscalYearId: Joi.number().integer().required(),
});

export const updateLeaveRequestSchema = Joi.object({
  leaveTypeId: Joi.number().integer(),
  userId: Joi.number().integer(),
  startDate: Joi.date().format(YYYY_MM_DD).raw(),
  endDate: Joi.date().format(YYYY_MM_DD).raw().greater(Joi.ref('startDate')),
  status: Joi.string(),
  leaveDays: Joi.number().integer(),
  reason: Joi.string(),
  fiscalYearId: Joi.number().integer().required(),
});

export const updateLeaveRequestStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(LeaveStatusEnum))
    .required(),
});
