import { Knex } from 'knex';

import UserRoleModel from '@/modules/roles/userRole.model';
import DesignationModel from '@/modules/designations/designation.model';
import RoleModel from '@/modules/roles/role.model';

import logger from '@/services/logger';
import { getFromStore } from '@/services/store';

import { compareHash, generateHash } from '@/utils/crypto';

import { BadRequestError } from '@/errors/errors';

import { User } from '@/types/user';
import { Any, Role } from '@/types/common';

import db from '@/db';

import UserModel from './user.model';

const log = logger.withNamespace('modules/user.service');

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchUsers = async (params: Any, trx?: Knex.Transaction): Promise<User[]> => {
  log.info('Fetching users');

  const users = await UserModel.fetchUserDetails({}, trx);

  return users;
};

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchUserById = async (id: number, trx?: Knex.Transaction): Promise<User[]> => {
  log.info('Fetching users');

  const users = await UserModel.fetchById(id, trx);

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
 * Fetch current user.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchCurrentUser = async (): Promise<User | null> => {
  log.info('Fetching current user.');

  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return null;
  }

  return UserModel.fetchById(currentUser?.id);
};

/**
 * Sign in the user.
 *
 * @param body - The user object containing the sign in details
 * @returns A promise that resolves when the user is signed in.
 */
export const signIn = async (body: { email: string; password: string }): Promise<User> => {
  log.info(`Signing in user with email: ${body.email}`);

  const [existingUser] = await UserModel.fetch({ email: body.email });

  if (!existingUser) {
    throw new BadRequestError('User not found.');
  }

  if (!compareHash(body.password, existingUser.password)) {
    throw new BadRequestError('Email or password does not match.');
  }

  const [user] = await UserModel.fetchUserDetails({ email: body.email });

  return user;
};

/**
 * Sign up a new user.
 *
 * @param user - The user object containing the sign up details.
 * @returns A promise that resolves when the user is signed up.
 */
export const signUp = async (userBody: { password: string } & Omit<User, 'id'>): Promise<User> => {
  log.info(`Signing up new user: ${userBody.email}`);

  const hashedPassword = await generateHash(userBody.password);

  const [existingUser] = await UserModel.fetchUserDetails({ email: userBody.email });

  if (existingUser) {
    throw new BadRequestError('User with email already exists.');
  }

  const insertedUserId = await db.transaction(async (trx: Knex.Transaction): Promise<number> => {
    const designation = await DesignationModel.fetchById(userBody.designationId, trx);

    if (!designation) {
      throw new BadRequestError('Invalid designation.');
    }

    const roles = await RoleModel.fetch();

    const userRoleId = roles.find((role: Role) => role.name === 'User')?.id;

    if (!userRoleId) {
      throw new BadRequestError('User role not found.');
    }

    const [userId] = await UserModel.insert({ ...userBody, password: hashedPassword }, trx);

    await UserRoleModel.insert({ userId, roleId: userRoleId }, trx);

    return userId;
  });

  const user = await UserModel.fetchById(insertedUserId);

  return user;
};
