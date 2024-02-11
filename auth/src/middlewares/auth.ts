import { Request, Response, NextFunction } from 'express';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //TODO: Implement authentication middleware
  next();
};

export default authenticationMiddleware;
