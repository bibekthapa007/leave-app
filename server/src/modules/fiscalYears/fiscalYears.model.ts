import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { FiscalYear, Any } from '@/types/common';

import dbTables from '@/constants/db';

class FiscalYearModel extends BaseModel {
  static table = dbTables.fiscalYears;

  /**
   * Base query.
   *
   * @param {id} number
   * @param {Knex.Transaction} trx
   * @returns
   */
  static baseQuery(trx?: Knex.Transaction) {
    return this.queryBuilder(trx)
      .select({
        id: 'fy.id',
        startDate: 'fy.start_date',
        endDate: 'fy.end_date',
        isCurrent: 'fy.is_current',
        countryId: 'fy.country_id',
        country: 'c.name',
      })
      .from({ fy: this.table })
      .leftJoin({ c: dbTables.countries }, 'c.id', 'fy.country_id');
  }

  /**
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {FilterNotesParams} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: Any) {
    if (filters?.id) {
      query.where('fy.id', filters.id);
    }

    if (filters?.isCurrent) {
      query.where('fy.isCurrent', filters.isCurrent);
    }

    if (filters?.country) {
      query.where('c.name', filters.country);
    }

    if (filters?.countryId) {
      query.where('c.id', filters.countryId);
    }

    return query;
  }

  /**
   * Fetch fiscal years based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<FiscalYear[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    const query = this.baseQuery(trx);

    this.injectFilter(query, filters);

    return query;
  }

  /**
   * Fetch a fiscal year by its ID.
   *
   * @param {number} id
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<FiscalYear>}
   */
  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    const query = this.baseQuery(trx);

    this.injectFilter(query, { ...filters, id });

    return query.first();
  }

  /**
   * Insert data into fiscal_years table.
   *
   * @param {Partial<FiscalYear>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<FiscalYear>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Update a fiscal year by its ID.
   *
   * @param {number} id
   * @param {Partial<FiscalYear>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static updateById(id: number, data: Partial<FiscalYear>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).update(data);
  }

  /**
   * Delete a fiscal year by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static deleteById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }
}

export default FiscalYearModel;
