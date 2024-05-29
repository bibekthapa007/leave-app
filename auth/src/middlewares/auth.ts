import { Request, Response, NextFunction } from 'express';

import { addToStore, getFromStore } from '@/services/store';

import { verify } from '@/utils/jwt';

import { ForbiddenError } from '@/errors/errors';

import { User } from '@/types/user';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader.startsWith('Bearer ') && authHeader.split(' ')[1];

  if (!accessToken) {
    addToStore({ currentUser: null });

    next();

    return;
  }

  const userPayload = verify(accessToken) as { data: User };

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
