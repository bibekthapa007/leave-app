import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { LeaveType } from '@/types/leave';

class LeaveTypeModel extends BaseModel {
  static table = 'leave_types';

  static insert(data: LeaveType, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  static fetch(filter?: { id?: number; name?: string }, trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx).select('*').from('leave_types as lt');

    if (filter?.id) {
      query.where('lt.id', filter.id);
    }

    if (filter?.name) {
      query.where('lt.name', filter.name);
    }

    return query;
  }

  static injectFilter(query: Knex.QueryBuilder, filters: LeaveType) {
    if (filters?.id) {
      query.where('lt.id', filters.id);
    }

    if (filters?.name) {
      query.where('lt.name', filters.name);
    }

    return query;
  }

  static fetchById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from(this.table).where('id', id).first();
  }

  static update(id: number, updates: Partial<LeaveType>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).update(updates).where('id', id);
  }

  static delete(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).delete().where('id', id);
  }
}

export default LeaveTypeModel;
