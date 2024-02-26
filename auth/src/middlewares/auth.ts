import { Request, Response, NextFunction } from 'express';

import jwt from '@/utils/jwt';
import { User } from '@/types/user';
import { addToStore, getFromStore } from '@/services/store';
import { ForbiddenError } from '@/errors/errors';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const session = req.session;

  if (!session?.accessToken) {
    addToStore({ currentUser: null });

    next();

    return;
  }

  const userPayload = jwt.verify(session.accessToken) as { data: User };
  console.log({ userPayload });

  addToStore({ currentUser: userPayload?.data });

  next();
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = getFromStore('currentUser');

  if (!currentUser) {
    throw new ForbiddenError('Forbidden. User not authenticated.');
  }

  next();
};

export default authenticationMiddleware;
