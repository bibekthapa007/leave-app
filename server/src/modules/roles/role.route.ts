import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as roleController from './role.controller';

const router = Router();

// TODO: use requireAuth
router.get('/', requireAuth, roleController.getRoles);

export default router;
