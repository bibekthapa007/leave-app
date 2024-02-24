import { Router } from 'express';

import { validateReqBody } from '@/utils/validator';

import * as userController from './user.controller';
import * as userValidator from './user.validator';

const router = Router();

router.get('/', userController.getUsers);

router.post('/signin', validateReqBody(userValidator.signInSchema), userController.signIn);

router.post('/signup', validateReqBody(userValidator.signUpSchema), userController.signUp);

router.post('/signout', userController.signOut);

export default router;
