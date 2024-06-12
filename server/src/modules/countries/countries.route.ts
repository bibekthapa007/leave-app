import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as countriesController from './countries.controller';

const router = Router();

// TODO: use requireAuth for other route expecct this
router.get('/', countriesController.fetchCountries);

export default router;
