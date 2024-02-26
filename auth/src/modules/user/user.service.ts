import UserModel, { UserAttributes, UserDocument } from '@/models/user';

import logger from '@/services/logger';
import { getFromStore } from '@/services/store';

import { compareHash } from '@/utils/crypto';

import { BadRequestError } from '@/errors/errors';

import { User } from '@/types/user';

const log = logger.withNamespace('modules/user.service');

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const getUsers = (): Promise<User[]> => {
  log.info('Fetching users');

  return Promise.resolve([]);
};

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const getCurrentUser = async (): Promise<User | null> => {
  log.info('Fetching current user.');

  return getFromStore('currentUser') || null;
};

/**
 * Sign in the user.
 *
 * @param body - The user object containing the sign in details
 * @returns A promise that resolves when the user is signed in.
 */
export const signIn = async (body: { email: string; password: string }): Promise<UserDocument> => {
  log.info(`Signing in user with email: ${body.email}`);

  const existingUser = await UserModel.findOne({ email: body.email });

  if (!existingUser) {
    throw new BadRequestError('User not found.');
  }

  if (!compareHash(body.password, existingUser.password)) {
    throw new BadRequestError('Email or password does not match.');
  }

  return existingUser;
};

/**
 * Sign up a new user.
 *
 * @param user - The user object containing the sign up details.
 * @returns A promise that resolves when the user is signed up.
 */
export const signUp = async (user: UserAttributes): Promise<UserDocument> => {
  log.info(`Signing up new user: ${user.email}`);

  const existingUser = await UserModel.findOne({ email: user.email });

  if (existingUser) {
    throw new BadRequestError('User with email already exists.');
  }

  const userInstance = UserModel.build(user);
  await userInstance.save();

  return userInstance.toJSON();
};
