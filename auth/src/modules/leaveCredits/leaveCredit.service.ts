import { Knex } from 'knex';

import { LeaveCredit } from '@/types/leave';
import { Any } from '@/types/common';

import LeaveCreditsModel from './leaveCredit.model';

export async function createLeaveCredit(data: LeaveCredit, trx?: Knex.Transaction) {
  return LeaveCreditsModel.create(data, trx);
}

export async function fetchLeaveCredits(params: Any, trx?: Knex.Transaction) {
  return LeaveCreditsModel.fetch(params, trx);
}

export async function fetchLeaveCreditById(id: number, trx?: Knex.Transaction) {
  return LeaveCreditsModel.fetchById(id, trx);
}

export async function updateLeaveCredit(
  id: number,
  updates: Partial<LeaveCredit>,
  trx?: Knex.Transaction
) {
  return LeaveCreditsModel.update(id, updates, trx);
}

export async function deleteLeaveCredit(id: number, trx?: Knex.Transaction) {
  return LeaveCreditsModel.delete(id, trx);
}
