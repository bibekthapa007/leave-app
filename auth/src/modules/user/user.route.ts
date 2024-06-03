import { Router } from 'express';

import { validateReqBody } from '@/utils/validator';

import { requireAuth } from '@/middlewares/auth';

import * as userController from './user.controller';
import * as userValidator from './user.validator';

const router = Router();

// TODO: use requireAuth
router.get('/', userController.fetchUsers);

router.get('/:id', userController.fetchUserById);

router.get('/currentuser', userController.fetchCurrentUser);

router.post('/signin', validateReqBody(userValidator.signInSchema), userController.signIn);

router.post('/signup', validateReqBody(userValidator.signUpSchema), userController.signUp);

router.post('/signout', userController.signOut);

export default router;
