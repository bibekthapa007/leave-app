import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { LeaveRequest, LeaveStatusEnum } from '@/types/leave';
import { Any } from '@/types/common';

import dbTables from '@/constants/db';

class LeaveRequestsModel extends BaseModel {
  static table = dbTables.leaveRequests;

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
        id: 'lq.id',
        status: 'lq.status',
        startDate: 'lq.startDate',
        endDate: 'lq.endDate',
        reason: 'lq.reason',
        user_id: 'lq.user_id',
        user_name: 'u.name',
        user_email: 'u.email',
        manager_id: 'm.id',
        manager_name: 'm.name',
        manager_email: 'm.email',
        leave_type_id: 'lt.id',
        leave_type_name: 'lt.name',
        createdAt: 'lq.created_at',
        createdBy: 'lq.created_by',
        updatedAt: 'lq.updated_at',
        updatedBy: 'lq.updated_by',
      })
      .from({ lq: this.table })
      .leftJoin({ lt: dbTables.leaveTypes }, 'lt.id', 'lq.leave_type_id')
      .leftJoin({ fy: dbTables.fiscalYears }, 'fy.id', 'lq.fiscal_year_id')
      .leftJoin({ u: dbTables.users }, 'u.id', 'lq.user_id')
      .leftJoin({ m: dbTables.users }, 'm.id', 'u.manager_id')
      .whereNot('lq.status', LeaveStatusEnum.CANCELED);

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

    if (filters?.managerId) {
      query.where('m.id', filters.managerId);
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
  static fetch(filter?: { userId?: number; fiscalYearId?: number }, trx?: Knex.Transaction) {
    const query = this.baseQuery(trx);

    this.injectFilter(query, filter);

    return query.then(res => res.map(this.mapToModel));
  }

  static async create(data: LeaveRequest, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
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

  static mapToModel(leave: Any): LeaveRequest {
    const data = leave.id && {
      id: leave.id,
      user: leave.userId && {
        id: leave.userId,
        name: leave.userName,
      },
      manager: leave.manager?.id && {
        id: leave.managerId,
        name: leave.managerName,
      },
      leaveType: leave.leave_type_id && {
        id: leave.leaveTypeId,
        name: leave.leaveTypeName,
      },
      status: leave.status,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      createdAt: leave.createdAt,
      createdBy: leave.createdBy,
      updatedAt: leave.updatedAt,
      updatedBy: leave.updatedBy,
    };

    return data as LeaveRequest;
  }
}

export default LeaveRequestsModel;
