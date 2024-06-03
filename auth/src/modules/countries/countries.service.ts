import { Knex } from 'knex';

import CountryModel from '@/modules/countries/countries.model';

import logger from '@/services/logger';

import { Any, Country } from '@/types/common';

const log = logger.withNamespace('modules/degisnations.service');

/**
 * Fetch list of countries.
 *
 * @returns A promise that resolves to an array of countries objects.
 */
export const fetchCountries = async (params: Any, trx?: Knex.Transaction): Promise<Country[]> => {
  log.info('Fetching countries');

  const countries = await CountryModel.fetch(params, trx);

  return countries;
};
