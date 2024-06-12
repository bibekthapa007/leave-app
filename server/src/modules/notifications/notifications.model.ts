import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Any } from '@/types/common';
import { Notification } from '@/types/notification';

import dbTables from '@/constants/db';

class NotificationModel extends BaseModel {
  static table = dbTables.notifications;

  /**
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {FilterNotesParams} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: Any) {
    if (filters.userId) {
      query.where('user_id', filters.userId);
    }

    if (filters.isRead !== undefined) {
      query.where('is_read', filters.isRead);
    }

    if (filters.type) {
      query.where('type', filters.type);
    }

    return query;
  }

  /**
   * Insert data into notifications table.
   *
   * @param {Partial<Notification>} data
   * @param {Knex.Transaction} trx
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<Notification>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Fetch all notifications based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} trx
   * @returns {Knex.QueryBuilder<Notification[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx).select('*').from({ n: this.table });

    this.injectFilter(query, filters);

    return query;
  }

  /**
   * Fetch a notification by id.
   *
   * @param {number} id
   * @param {Knex.Transaction} trx
   * @returns {Knex.QueryBuilder<Notification>}
   */
  static fetchById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ n: this.table }).where('id', id).first();
  }

  static async update(id: number, updates: Partial<Notification>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).update(updates).where('id', id);
  }

  static async delete(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).delete().where('id', id);
  }
}

export default NotificationModel;
