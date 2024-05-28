import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { User, UserBody, UserFilters } from '@/types/user';
import { Any, Designation } from '@/types/common';

import dbTables from '@/constants/db';

class RoleModel extends BaseModel {
  static table = dbTables.roles;

  /**
   * Insert data into role table.
   *
   * @param {Partial<Any>} data
   * @param {Knex.Transaction} trx
   * @returns  {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<Any>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  static fetch(filters?: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ d: this.table });
  }

  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ d: this.table }).where('id', id).first();
  }
}

export default RoleModel;
