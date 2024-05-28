import { Knex } from 'knex';

import logger from '@/services/logger';
import { getFromStore } from '@/services/store';

import { compareHash } from '@/utils/crypto';

import { BadRequestError } from '@/errors/errors';

import { User } from '@/types/user';
import { Any } from '@/types/common';

import UserModel from './user.model';

const log = logger.withNamespace('modules/user.service');

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const getUsers = async (params: Any, trx?: Knex.Transaction): Promise<User[]> => {
  log.info('Fetching users');

  const users = await UserModel.fetchUserDetails({}, trx);

  return users;
};

/**
 * Fetch current user.
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
export const signIn = async (body: { email: string; password: string }): Promise<User> => {
  log.info(`Signing in user with email: ${body.email}`);

  const [existingUser] = await UserModel.fetchUserDetails({ email: body.email });

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
export const signUp = async (user: User): Promise<User> => {
  log.info(`Signing up new user: ${user.email}`);

  const [existingUser] = await UserModel.fetchUserDetails({ email: user.email });

  if (existingUser) {
    throw new BadRequestError('User with email already exists.');
  }

  return existingUser;
};
