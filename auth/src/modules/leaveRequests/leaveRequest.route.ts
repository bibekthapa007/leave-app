import { Router } from 'express';

import { validateReqBody } from '@/utils/validator';

import { Roles } from '@/types/common';

import { requireAuth } from '@/middlewares/auth';
import { authorizeUserManager, authorizeWithRoles } from '@/middlewares/authorizeWIthRoles';

import * as leaveRequestsController from './leaveRequest.controller';
import * as leaveRequestsValidator from './leaveRequest.validator';

const router = Router();

// Use requireAuth middleware
router.use(requireAuth);

router.get('/', leaveRequestsController.fetchLeaveRequests);

router.get('/:id', leaveRequestsController.fetchLeaveRequestById);

router.post(
  '/',
  validateReqBody(leaveRequestsValidator.createLeaveRequestSchema),
  authorizeWithRoles({
    roles: [Roles.ADMIN],
    isSelf: true,
    extraPrivilegePromises: [authorizeUserManager],
  }),
  leaveRequestsController.createLeaveRequest
);

router.put(
  '/:id',
  validateReqBody(leaveRequestsValidator.updateLeaveRequestSchema),
  authorizeWithRoles({
    roles: [Roles.ADMIN],
    isSelf: true,
    extraPrivilegePromises: [authorizeUserManager],
  }),
  leaveRequestsController.updateLeaveRequest
);

router.delete(
  '/:id',
  authorizeWithRoles({
    roles: [Roles.ADMIN],
    isSelf: true,
  }),
  leaveRequestsController.deleteLeaveRequest
);

router.post(
  '/:id/status',
  validateReqBody(leaveRequestsValidator.updateLeaveRequestStatusSchema),
  authorizeWithRoles({
    roles: [Roles.ADMIN],
    extraPrivilegePromises: [authorizeUserManager],
  }),
  leaveRequestsController.updateLeaveRequestStatus
);

export default router;
