import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as leaveTypeService from './leaveType.service';

export async function fetchLeaveTypes(req: Request, res: Response): Promise<Response> {
  const leaveTypes = await leaveTypeService.fetchLeaveTypes(req.query);

  return res.status(HttpStatus.OK).json({ data: leaveTypes });
}

export async function fetchLeaveTypeById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const leaveTypeId = parseInt(id, 10);

  const leaveType = await leaveTypeService.fetchLeaveTypeById(leaveTypeId);

  if (!leaveType) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Leave type not found' });
  }

  return res.status(HttpStatus.OK).json({ data: leaveType });
}

export async function createLeaveType(req: Request, res: Response): Promise<Response> {
  const leaveType = req.body;

  const createdLeaveType = await leaveTypeService.createLeaveType(leaveType);

  return res.status(HttpStatus.CREATED).json({ data: createdLeaveType });
}

export async function updateLeaveType(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const leaveTypeId = parseInt(id, 10);
  const updates = req.body;

  const updatedLeaveType = await leaveTypeService.updateLeaveType(leaveTypeId, updates);

  return res.status(HttpStatus.OK).json({ data: updatedLeaveType });
}

export async function deleteLeaveTypeById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const leaveTypeId = parseInt(id, 10);

  await leaveTypeService.deleteLeaveTypeById(leaveTypeId);

  return res.status(HttpStatus.NO_CONTENT).send();
}
