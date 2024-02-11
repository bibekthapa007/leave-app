import { Request, NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as userService from './user.service';

/**
 * Get all users.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();

    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};
