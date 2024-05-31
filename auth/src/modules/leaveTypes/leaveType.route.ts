import { Router } from 'express';

import { validateReqBody } from '@/utils/validator';

import { requireAuth } from '@/middlewares/auth';

import * as leaveTypesController from './leaveType.controller';
import * as leaveTypesValidator from './leaveType.validator';

const router = Router();

router.use(requireAuth);

router.post(
  '/',
  validateReqBody(leaveTypesValidator.createLeaveTypeSchema),
  leaveTypesController.createLeaveType
);

router.get('/', leaveTypesController.fetchLeaveTypes);

router.get('/:id', leaveTypesController.fetchLeaveTypeById);

router.put(
  '/:id',
  validateReqBody(leaveTypesValidator.updateLeaveTypeSchema),
  leaveTypesController.updateLeaveType
);

router.delete('/:id', leaveTypesController.deleteLeaveTypeById);

export default router;
