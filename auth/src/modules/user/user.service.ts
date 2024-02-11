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
