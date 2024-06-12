import { Knex } from 'knex';

import FiscalYearModel from '@/modules/fiscalYears/fiscalYears.model';

import logger from '@/services/logger';

import { Any, FiscalYear } from '@/types/common';

const log = logger.withNamespace('modules/fiscalYears.service');

/**
 * Fetch list of fiscal years.
 *
 * @returns A promise that resolves to an array of fiscal years objects.
 */
export const fetchFiscalYears = async (
  params: Any,
  trx?: Knex.Transaction
): Promise<FiscalYear[]> => {
  log.info('Fetching fiscal years');
  const fiscalYears = await FiscalYearModel.fetch(params, trx);

  return fiscalYears;
};

/**
 * Fetch list of fiscal years.
 *
 * @returns A promise that resolves to an array of fiscal years objects.
 */
export const fetchFiscalYearById = async (
  id: number,
  params: Any,
  trx?: Knex.Transaction
): Promise<FiscalYear[]> => {
  log.info(`Fetching fiscal years by id: ${id} `);
  const fiscalYears = await FiscalYearModel.fetchById(id, params, trx);

  return fiscalYears;
};
