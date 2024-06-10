import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import { getCurrentUser } from '@/modules/user/user.service';

import { LeaveRequest, LeaveRequestBody } from '@/types/leave';

import { updateLeaveRequest as updateLeaveRequestService } from './leaveRequest.service';
import * as leaveRequestsService from './leaveRequest.service';

export async function fetchLeaveRequests(req: Request, res: Response): Promise<Response> {
  const leaveRequests = await leaveRequestsService.fetchLeaveRequests();

  return res.status(HttpStatus.OK).json({ data: leaveRequests });
}

export async function fetchLeaveRequestById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const leaveRequest = await leaveRequestsService.fetchLeaveRequestById(parseInt(id, 10));

  if (!leaveRequest) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Leave request not found' });
  }

  return res.status(HttpStatus.OK).json({ data: leaveRequest });
}

export async function createLeaveRequest(req: Request, res: Response): Promise<Response> {
  const leaveRequest: LeaveRequestBody = req.body;
  const currentUser = getCurrentUser();

  const createdLeaveRequest = await leaveRequestsService.createLeaveRequest(leaveRequest);

  return res.status(HttpStatus.CREATED).json({ data: createdLeaveRequest });
}

export async function updateLeaveRequest(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const updates = req.body;

  const updatedLeaveRequest = await leaveRequestsService.updateLeaveRequest(
    parseInt(id, 10),
    updates
  );

  return res.status(HttpStatus.OK).json({ data: updatedLeaveRequest });
}

export async function deleteLeaveRequest(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  await leaveRequestsService.deleteLeaveRequest(parseInt(id, 10));

  return res.status(HttpStatus.NO_CONTENT).send();
}

export async function updateLeaveRequestStatus(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const leaveRequestId = parseInt(id, 10);

  const { status } = req.body;

  const updatedLeaveRequest = await updateLeaveRequestService(leaveRequestId, { status });

  return res.status(HttpStatus.OK).json({ data: updatedLeaveRequest });
}
