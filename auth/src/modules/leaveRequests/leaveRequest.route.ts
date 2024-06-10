import { Router } from 'express';

import { validateReqBody } from '@/utils/validator';

import { requireAuth } from '@/middlewares/auth';

import * as leaveRequestsController from './leaveRequest.controller';
import * as leaveRequestsValidator from './leaveRequest.validator';

const router = Router();

// Use requireAuth middleware
router.use(requireAuth);

// Routes
router.get('/', leaveRequestsController.fetchLeaveRequests);
router.get('/:id', leaveRequestsController.fetchLeaveRequestById);
router.post(
  '/',
  validateReqBody(leaveRequestsValidator.createLeaveRequestSchema),
  leaveRequestsController.createLeaveRequest
);

router.put(
  '/:id',
  validateReqBody(leaveRequestsValidator.updateLeaveRequestSchema),
  leaveRequestsController.updateLeaveRequest
);
router.delete('/:id', leaveRequestsController.deleteLeaveRequest);

router.post(
  '/:id/status',
  validateReqBody(leaveRequestsValidator.updateLeaveRequestStatusSchema),
  leaveRequestsController.updateLeaveRequestStatus
);

export default router;
