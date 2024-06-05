import * as leaveCreditsService from '@/modules/leaveCredits/leaveCredit.service';
import * as leaveTypesService from '@/modules/leaveTypes/leaveType.service';

import { BadRequestError } from '@/errors/errors';

import { LeaveRequest, LeaveRequestBody } from '@/types/leave';

import db from '@/db';

import leaveRequestsModel from './leaveRequest.model';
import { getCurrentUser } from '../user/user.service';

export async function fetchLeaveRequests(): Promise<LeaveRequest[]> {
  return leaveRequestsModel.fetch({});
}

export async function fetchLeaveRequestById(id: number): Promise<LeaveRequest | undefined> {
  return leaveRequestsModel.fetchById(id);
}

export async function createLeaveRequest(leaveRequest: LeaveRequestBody): Promise<LeaveRequest> {
  const currentUser = await getCurrentUser();

  const [existingLeaveRequest] = await leaveRequestsModel.fetch({
    userId: leaveRequest.userId,
    startDate: leaveRequest.startDate,
    endDate: leaveRequest.endDate,
  });

  if (existingLeaveRequest) {
    throw new BadRequestError('Leave request already exists for given time period.');
  }

  const leaveCreatedId = await db.transaction(async trx => {
    const [leaveCredit] = await leaveCreditsService.fetchLeaveCredits(
      {
        userId: leaveRequest.userId,
      },
      trx
    );
    if (!leaveCredit) {
      throw new BadRequestError('User does not have any leave credit.');
    }

    if (leaveCredit.leaveDays === 0) {
      throw new BadRequestError('Cannot apply leave,user has 0 leave credit.');
    }

    const leaveType = await leaveTypesService.fetchLeaveTypeById(leaveRequest.leaveTypeId, trx);

    const [id] = await leaveRequestsModel.create(
      { ...leaveRequest, createdBy: +currentUser?.id },
      trx
    );

    return id;
  });

  return fetchLeaveRequestById(leaveCreatedId);
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
