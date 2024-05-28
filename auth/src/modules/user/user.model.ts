import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { User, UserBody, UserFilters } from '@/types/user';
import { Any } from '@/types/common';

class UserModel extends BaseModel {
  static table = 'users';

  /**
   * Insert data into user table.
   *
   * @param {Partial<UserBody>} data
   * @param {Knex.Transaction} trx
   * @returns  {Knex.QueryBuilder<number[]>}
   */
  static insert(data: { password: string } & UserBody, trx?: Knex.Transaction) {
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
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {FilterNotesParams} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: UserFilters) {
    if (filters?.id) {
      query.where('u.id', filters.id);
    }

    if (filters?.email) {
      query.where('u.email', filters.email);
    }

    return query;
  }

  static fetchUserDetails(filters: UserFilters, trx?: Knex.Transaction): Knex.QueryBuilder {
    const query = this.queryBuilder(trx)
      .select('u.*')
      .from('users as u')
      .leftJoin('user_roles as ur', 'ur.user_id', 'u.id')
      .leftJoin('roles as r', 'r.id', 'ur.role_id')
      .leftJoin('designations as d', 'u.designation_id', 'd.id');

    this.injectFilter(query, filters);

    return query;
  }

  /**
   * Fetch users by id.
   *
   * @param {id} number
   * @param {Knex.Transaction} trx
   * @returns
   */
  static fetchById(id: number, trx?: Knex.Transaction) {
    return this.fetchUserDetails({ id }, trx).first();
  }

  static update(userId: number, updatedData: Partial<UserBody>, trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx).table(this.table).update(updatedData).where('id', userId);

    return query;
  }

  static softDelete(userId: number, currentUserId: number, trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx)
      .table(this.table)
      .update({ deleted_at: 'now()', deleted_by: currentUserId })
      .where('id', userId);

    return query;
  }
}

export default UserModel;
