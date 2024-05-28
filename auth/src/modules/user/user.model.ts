import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { User } from '@/types/user';
import { Any } from '@/types/common';

class UserModel extends BaseModel {
  static table = 'users';

  /**
   * Insert data into user table.
   *
   * @param {User} data
   * @param {Knex.Transaction} trx
   * @returns  {Knex.QueryBuilder<number[]>}
   */
  static insert(data: User, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Fetch users.
   *
   * @param {id} number
   * @param {Knex.Transaction} trx
   * @returns
   */
  static fetch(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from('users as u').where('id', id).first();
  }

  /**
   * Fetch users by id.
   *
   * @param {id} number
   * @param {Knex.Transaction} trx
   * @returns
   */
  static fetchById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from('users as u').where('id', id).first();
  }

  static fetchUserDetails(params: Any, trx?: Knex.Transaction): Knex.QueryBuilder {
    const query = this.queryBuilder()
      .select('u.*')
      .from('users as u')
      .leftJoin('user_roles as ur', 'ur.user_id', 'u.id')
      .leftJoin('roles as r', 'r.id', 'ur.role_id')
      .leftJoin('designations as d', 'u.designation_id', 'd.id');

    return query;
  }
}

export default UserModel;
