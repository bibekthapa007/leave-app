import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { LeaveCredit } from '@/types/leave';
import { Any } from '@/types/common';

import dbTables from '@/constants/db';

class LeaveCreditsModel extends BaseModel {
  static table = dbTables.leaveCredits;

  /**
   * Base query.
   *
   * @param {id} number
   * @param {Knex.Transaction} trx
   * @returns
   */
  static baseQuery(trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx)
      .select({
        id: 'lc.id',
        user_id: 'lc.user_id',
        default_days: 'lt.default_days',
        leave_type_id: 'lc.leave_type_id',
        leave_days: 'lc.leave_days',
        taken_days: 'lc.taken_days',
        leave_type_name: 'lt.name',
      })
      .from({ lc: this.table })
      .join({ lt: dbTables.leaveTypes }, 'lt.id', 'lc.leave_type_id')
      .join({ fy: dbTables.fiscalYears }, 'fy.id', 'lc.fiscal_year_id')
      .join({ u: dbTables.users }, 'u.id', 'lc.user_id');

    return query;
  }

  /**
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {FilterNotesParams} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: Any) {
    if (filters?.userId) {
      query.where('u.id', filters.userId);
    }

    if (filters?.fiscalYearId) {
      query.where('fy.id', filters.fiscalYearId);
    }

    return query;
  }

  /**
   * Fetch leave credits.
   *
   * @param {id} number
   * @param {Knex.Transaction} trx
   * @returns
   */
  static fetch(filter?: { userId: number; fiscalYearId: number }, trx?: Knex.Transaction) {
    const query = this.baseQuery(trx);

    this.injectFilter(query, filter);

    return query;
  }

  static async create(data: LeaveCredit, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  static async fetchById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from(this.table).where('id', id).first();
  }

  static async update(id: number, updates: Partial<LeaveCredit>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).update(updates).where('id', id);
  }

  static async delete(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).delete().where('id', id);
  }
}

export default LeaveCreditsModel;
