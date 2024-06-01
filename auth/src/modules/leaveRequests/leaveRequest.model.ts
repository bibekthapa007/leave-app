import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { LeaveRequest } from '@/types/leave';
import { Any } from '@/types/common';

class LeaveRequestsModel extends BaseModel {
  static table = 'leave_requests';

  static async create(data: LeaveRequest, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  static async fetch(params: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from(this.table).where(params);
  }

  static async fetchById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from(this.table).where('id', id).first();
  }

  static async update(id: number, updates: Partial<LeaveRequest>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).update(updates).where('id', id);
  }

  static async delete(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).delete().where('id', id);
  }
}

export default LeaveRequestsModel;
