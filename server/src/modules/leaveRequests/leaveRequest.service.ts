import { Knex } from 'knex';

import * as leaveCreditsService from '@/modules/leaveCredits/leaveCredit.service';
import * as leaveTypesService from '@/modules/leaveTypes/leaveType.service';
import * as notificationsService from '@/modules/notifications/notifications.service';
import * as usersService from '@/modules/user/user.service';

import { BadRequestError, ForbiddenError } from '@/errors/errors';

import { LeaveRequest, LeaveRequestBody, LeaveRequestFilter, LeaveStatusEnum } from '@/types/leave';
import { Role, Roles } from '@/types/common';
import { NotificationType } from '@/types/notification';
import { User } from '@/types/user';

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
    if (!userRoles.includes(Roles.MANAGER)) {
      throw new BadRequestError('Unauthorized to fetch all user leave requests.');
    }
  }

  if (fetchType === 'self' && !isSelf) {
    if (!userRoles.includes(Roles.USER)) {
      throw new BadRequestError('Unauthorized to user leave requests.');
    }
  }
}

export async function fetchLeaveRequests(filters?: LeaveRequestFilter): Promise<LeaveRequest[]> {
  const currentUser = await getCurrentUser();

  const userId = filters?.userId ? filters.userId : +currentUser?.id;

  const fetchType = filters?.fetchType ? filters.fetchType : getFetchType(currentUser?.roles);

  authorizeFetchType(currentUser?.roles, fetchType, userId === +currentUser?.id);

  return leaveRequestsModel.fetch({
    fetchType,
    currentUserId: +currentUser?.id,
    ...(fetchType === 'self' ? { userId } : {}),
    ...(fetchType === 'manager' ? { managerId: currentUser.manager?.id } : {}),
  });
}

export async function fetchLeaveRequestById(id: number): Promise<LeaveRequest | undefined> {
  return leaveRequestsModel.fetchById(id);
}

export async function createLeaveRequest(
  leaveRequestBody: LeaveRequestBody
): Promise<LeaveRequest> {
  const currentUser = await getCurrentUser();

  const [existingLeaveRequest] = await leaveRequestsModel.fetch({
    userId: leaveRequestBody.userId,
    startDate: leaveRequestBody.startDate,
    endDate: leaveRequestBody.endDate,
  });

  if (existingLeaveRequest) {
    throw new BadRequestError('Leave request already exists for given time period.');
  }

  const user = await usersService.fetchUserById(leaveRequestBody.userId);

  const leaveCreatedId = await db.transaction(async trx => {
    const [leaveCredit] = await leaveCreditsService.fetchLeaveCredits(
      {
        userId: leaveRequestBody.userId,
        fiscalYearId: leaveRequestBody.fiscalYearId,
      },
      trx
    );

    if (!leaveCredit) {
      throw new BadRequestError('User does not have any leave credit.');
    }

    const availableLeaveDays = leaveCredit.leaveDays - leaveCredit.takenDays;

    if (leaveCredit.leaveDays === 0) {
      throw new BadRequestError('Cannot apply leave,user has 0 leave credit.');
    }

    if (availableLeaveDays < leaveRequestBody.leaveDays) {
      throw new BadRequestError('Cannot apply leave, user has less leave credit.');
    }

    const leaveType = await leaveTypesService.fetchLeaveTypeById(leaveRequestBody.leaveTypeId, trx);

    if (!leaveType) {
      throw new BadRequestError('Leave type does not exist.');
    }

    const [id] = await leaveRequestsModel.create(
      { ...leaveRequestBody, createdBy: +currentUser?.id },
      trx
    );

    const newLeaveCredit = {
      takenDays: leaveCredit.takenDays + leaveRequestBody.leaveDays,
      updatedBy: +currentUser?.id,
    };

    await leaveCreditsService.updateLeaveCredit(leaveCredit.id, newLeaveCredit, trx);

    await createLeaveRequestNotification({ user, leaveRequest: { id, ...leaveRequestBody } }, trx);

    return id;
  });

  return fetchLeaveRequestById(leaveCreatedId);
}

function getLeaveNotificationType({ status }: LeaveRequest | LeaveRequestBody) {
  if (status === LeaveStatusEnum.CANCELED) {
    return {
      message: 'Leave cancaled',
      type: NotificationType.LEAVE_CACELED,
    };
  }

  if (status === LeaveStatusEnum.APPROVED) {
    return {
      message: 'Leave approved',
      type: NotificationType.LEAVE_APPROVED,
    };
  }

  if (status === LeaveStatusEnum.REJECTED) {
    return {
      message: 'Leave rejected',
      type: NotificationType.LEAVE_REJECTED,
    };
  }

  return {
    message: 'Leave requested',
    type: NotificationType.LEAVE_PENDING,
  };
}

async function createLeaveRequestNotification(
  { user, leaveRequest }: { user: User; leaveRequest: LeaveRequest | LeaveRequestBody },
  trx?: Knex.Transaction
) {
  const currentUser = await getCurrentUser();
  const managerId = user.manager?.id;

  const isSelf = user.id === currentUser?.id;
  const isManager = managerId === currentUser?.id;

  const notificationTypeData = getLeaveNotificationType(leaveRequest);

  const notificationData = {
    ...notificationTypeData,
    isRead: false,
    createdBy: +currentUser?.id,
    data: { leaveRequestId: leaveRequest.id, userId: user.id },
  };

  const notifications = [];

  if (!isSelf) {
    notifications.push({ ...notificationData, userId: user.id });
  }

  if (!isManager && managerId) {
    notifications.push({ ...notificationData, userId: managerId });
  }

  await Promise.all(
    notifications.map(notification => notificationsService.createNotification(notification, trx))
  );

  return;
}

export async function updateLeaveRequest(
  id: number,
  updates: Partial<LeaveRequest>
): Promise<LeaveRequest> {
  const leaveRequest = await fetchLeaveRequestById(id);

  const { status } = updates;

  const currentUser = await getCurrentUser();
  const user = await usersService.fetchUserById(leaveRequest.user.id);

  const isSelf = currentUser?.id === user.id;
  const isManager = currentUser?.id === user.manager?.id;
  const isAdmin = currentUser?.roles.map(role => role.name).includes(Roles.ADMIN);

  if (isSelf && status != LeaveStatusEnum.CANCELED) {
    throw new ForbiddenError('Unauthorized to update leave request.');
  }

  if (!isSelf && !isManager && !isAdmin) {
    throw new ForbiddenError('Unauthorized to update leave request.');
  }

  await db.transaction(async trx => {
    await leaveRequestsModel.update(id, updates, trx);

    await createLeaveRequestNotification(
      { user, leaveRequest: { ...leaveRequest, ...updates } },
      trx
    );
  });

  return await fetchLeaveRequestById(id);
}

export async function deleteLeaveRequest(id: number): Promise<LeaveRequest> {
  await leaveRequestsModel.delete(id);

  return await fetchLeaveRequestById(id);
}
