import { Router } from 'express';

import { validateReqBody } from '@/utils/validator';

import { requireAuth } from '@/middlewares/auth';

import * as leaveCreditController from './leaveCredit.controller';
import { createLeaveCreditSchema } from './leaveCredits.validator';

const router = Router();

router.use(requireAuth);

router.get('/', leaveCreditController.fetchLeaveCredits);

router.get('/:id', leaveCreditController.fetchLeaveCreditById);

router.post(
  '/:id',
  validateReqBody(createLeaveCreditSchema),
  leaveCreditController.updateLeaveCredit
);

router.put(
  '/:id',
  validateReqBody(createLeaveCreditSchema),
  leaveCreditController.updateLeaveCredit
);

router.delete('/:id', leaveCreditController.deleteLeaveCredit);

export default router;
