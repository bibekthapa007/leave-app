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
  const users = await userService.getUsers();

  return res.status(StatusCodes.OK).json(users);
};

/**
 * Sign up a new user.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 */
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  // Implement sign up logic here

  return res.status(StatusCodes.CREATED).json({ message: 'User signed up successfully' });
};

/**
 * Sign in a user.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 */
export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  // Implement sign in logic here

  return res.status(StatusCodes.OK).json({ message: 'User signed in successfully' });
};

/**
 * Sign out a user.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 */
export const signOut = async (req: Request, res: Response, next: NextFunction) => {
  // Implement sign out logic here

  return res.status(StatusCodes.OK).json({ message: 'User signed out successfully' });
};
