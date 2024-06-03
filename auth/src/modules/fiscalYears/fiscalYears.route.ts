import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as fiscalYearsController from './fiscalYears.controller';

const router = Router();

router.get('/', requireAuth, fiscalYearsController.fetchFiscalYears);

export default router;
