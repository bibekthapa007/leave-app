import { Knex } from 'knex';

import { LeaveRequest } from '@/types/leave';

import leaveRequestsModel from './leaveRequest.model';

export async function fetchLeaveRequests(): Promise<LeaveRequest[]> {
  return leaveRequestsModel.fetch({});
}

export async function fetchLeaveRequestById(id: number): Promise<LeaveRequest | undefined> {
  return leaveRequestsModel.fetchById(id);
}

export async function createLeaveRequest(leaveRequest: LeaveRequest): Promise<LeaveRequest> {
  const [id] = await leaveRequestsModel.create(leaveRequest);

  return fetchLeaveRequestById(id);
}

export async function updateLeaveRequest(
  id: number,
  updates: Partial<LeaveRequest>
): Promise<LeaveRequest> {
  await leaveRequestsModel.update(id, updates);

  return await fetchLeaveRequestById(id);
}

export async function deleteLeaveRequest(id: number): Promise<LeaveRequest> {
  await leaveRequestsModel.delete(id);

  return await fetchLeaveRequestById(id);
}
