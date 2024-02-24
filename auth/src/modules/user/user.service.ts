import logger from '@/services/logger';
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
 * Sign in the user.
 *
 * @param userId - The ID of the user to sign in.
 * @returns A promise that resolves when the user is signed in.
 */
export const signIn = (userId: string): Promise<void> => {
  log.info(`Signing in user with ID: ${userId}`);

  // TODO: Implement sign in logic

  return Promise.resolve();
};

/**
 * Sign up a new user.
 *
 * @param user - The user object containing the sign up details.
 * @returns A promise that resolves when the user is signed up.
 */
export const signUp = (user: User): Promise<void> => {
  log.info(`Signing up new user: ${user.email}`);

  // TODO: Implement sign up logic

  return Promise.resolve();
};

/**
 * Log out the user.
 *
 * @param userId - The ID of the user to log out.
 * @returns A promise that resolves when the user is logged out.
 */
export const logOut = (userId: string): Promise<void> => {
  log.info(`Logging out user with ID: ${userId}`);

  // TODO: Implement log out logic

  return Promise.resolve();
};
