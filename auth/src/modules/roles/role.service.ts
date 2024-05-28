import { Knex } from 'knex';

import logger from '@/services/logger';

import { Any, Role } from '@/types/common';

import RoleModel from './role.model';

const log = logger.withNamespace('modules/roles.service');

/**
 * Fetch list of roles.
 *
 * @returns A promise that resolves to an array of Role objects.
 */
export const getRoles = async (params: Any, trx?: Knex.Transaction): Promise<Role[]> => {
  log.info('Fetching roles');

  const roles = await RoleModel.fetch(params, trx);

  return roles;
};
