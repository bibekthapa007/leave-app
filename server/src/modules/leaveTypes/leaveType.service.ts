import { Knex } from 'knex';

import logger from '@/services/logger';

import { BadRequestError } from '@/errors/errors';

import { LeaveType } from '@/types/leave';
import { Any } from '@/types/common';

import LeaveTypeModel from './leaveType.model';

const log = logger.withNamespace('modules/leaveType.service');

export async function createLeaveType(data: LeaveType, trx?: Knex.Transaction): Promise<number[]> {
  log.info('Creating leave type');
  const leaveTypeIds = await LeaveTypeModel.insert(data, trx);
  return leaveTypeIds;
}

export async function fetchLeaveTypes(params: Any, trx?: Knex.Transaction): Promise<LeaveType[]> {
  log.info('Fetching leave types');
  const leaveTypes = await LeaveTypeModel.fetch(params, trx);
  return leaveTypes;
}

export async function fetchLeaveTypeById(
  id: number,
  trx?: Knex.Transaction
): Promise<LeaveType | undefined> {
  log.info(`Fetching leave type with ID: ${id}`);
  const leaveType = await LeaveTypeModel.fetchById(id, trx);
  return leaveType;
}

export async function updateLeaveType(
  id: number,
  updates: Partial<LeaveType>,
  trx?: Knex.Transaction
): Promise<LeaveType> {
  log.info(`Updating leave type with ID: ${id}`);
  const updatedLeaveTypeId = await LeaveTypeModel.update(id, updates, trx);

  const leaveType = await LeaveTypeModel.fetchById(updatedLeaveTypeId, trx);

  return leaveType;
}

export async function deleteLeaveTypeById(id: number, trx?: Knex.Transaction): Promise<void> {
  log.info(`Deleting leave type with ID: ${id}`);
  await LeaveTypeModel.delete(id, trx);
}
