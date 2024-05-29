import { Knex } from 'knex';

import DesignationModel from '@/modules/designations/designation.model';

import logger from '@/services/logger';

import { Any, Designation } from '@/types/common';

const log = logger.withNamespace('modules/degisnations.service');

/**
 * Fetch list of designations.
 *
 * @returns A promise that resolves to an array of Designations objects.
 */
export const getDesignations = async (
  params: Any,
  trx?: Knex.Transaction
): Promise<Designation[]> => {
  log.info('Fetching designations');

  const designations = await DesignationModel.fetch(params, trx);

  return designations;
};