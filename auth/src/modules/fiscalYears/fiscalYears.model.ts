import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { FiscalYear, Any } from '@/types/common';

import dbTables from '@/constants/db';

class FiscalYearModel extends BaseModel {
  static table = dbTables.fiscalYears;

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
   * Fetch fiscal years based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<FiscalYear[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ fy: this.table }).where(filters);
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
    return this.queryBuilder(trx).select('*').from({ fy: this.table }).where('id', id).first();
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
