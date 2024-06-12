import * as leaveCreditsService from '@/modules/leaveCredits/leaveCredit.service';
import * as leaveTypesService from '@/modules/leaveTypes/leaveType.service';

import { BadRequestError } from '@/errors/errors';

import { LeaveRequest, LeaveRequestBody, LeaveRequestFilter } from '@/types/leave';
import { Role, Roles } from '@/types/common';

import db from '@/db';

import leaveRequestsModel from './leaveRequest.model';
import { getCurrentUser } from '../user/user.service';

function getFetchType(roles: Role[]) {
  const userRoles = roles.map(role => role.name);
  if (userRoles.includes(Roles.ADMIN)) {
    return 'all';
  }

  if (userRoles.includes(Roles.MANAGER)) {
    return 'manager';
  }

  return 'self';
}

function authorizeFetchType(roles: Role[], fetchType: string, isSelf: boolean) {
  const userRoles = roles.map(role => role.name);

  if (fetchType === 'all') {
    if (!userRoles.includes(Roles.ADMIN)) {
      throw new BadRequestError('Unauthorized to fetch all leave requests.');
    }
  }

  if (fetchType === 'manager') {
    if (!userRoles.includes(Roles.ADMIN)) {
      throw new BadRequestError('Unauthorized to fetch all user leave requests.');
    }
  }

  if (fetchType === 'self' && !isSelf) {
    if (!userRoles.includes(Roles.ADMIN)) {
      throw new BadRequestError('Unauthorized to fetch all user leave requests.');
    }
  }
}

export async function fetchLeaveRequests(filters?: LeaveRequestFilter): Promise<LeaveRequest[]> {
  const currentUser = await getCurrentUser();

  const userId = filters?.userId ? filters.userId : +currentUser?.id;

  const fetchType = filters?.fetchType ? filters.fetchType : getFetchType(currentUser?.roles);

  authorizeFetchType(currentUser?.roles, fetchType, userId === +currentUser?.id);

  return leaveRequestsModel.fetch({ fetchType, currentUserId: +currentUser?.id, userId });
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

    if (!leaveType) {
      throw new BadRequestError('Leave type does not exist.');
    }

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
