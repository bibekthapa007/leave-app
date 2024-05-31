import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as designationController from './designation.controller';

const router = Router();

// TODO: use requireAuth for other route expecct this
router.get('/', designationController.fetchDesignations);

export default router;
