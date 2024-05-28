import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import { updateSessions } from '@/utils/session';

import * as tokenService from './token.service';
import * as userService from './user.service';

/**
 * Get all users.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers({});

  return res.status(HttpStatus.OK).json(users);
};

/**
 * Get current user.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  const currentUser = await userService.getCurrentUser();

  return res
    .status(HttpStatus.OK)
    .json({ message: 'Current user fetched successfully.', currentUser });
};

/**
 * Sign up a new user.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const signUp = async (req: Request, res: Response) => {
  const user = await userService.signUp(req.body);

  const data = await tokenService.generateAccessAndRefreshTokens({
    id: user.id,
    email: user.email,
  });
  updateSessions(req, data);

  return res.status(HttpStatus.CREATED).json({ message: 'User signed up successfully.', user });
};

/**
 * Sign in a user.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const signIn = async (req: Request, res: Response) => {
  const user = await userService.signIn(req.body);

  const data = await tokenService.generateAccessAndRefreshTokens({
    id: user.id,
    email: user.email,
  });
  updateSessions(req, data);

  return res.status(HttpStatus.OK).json({ message: 'User signed in successfully', user });
};

/**
 * Sign out a user.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const signOut = async (req: Request, res: Response) => {
  req.session = null;

  return res.status(HttpStatus.OK).json({ message: 'User signed out successfully' });
};
