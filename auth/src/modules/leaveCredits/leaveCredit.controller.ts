import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import { LeaveCredit } from '@/types/leave';

import * as leaveCreditsService from './leaveCredit.service';

export async function fetchLeaveCredits(req: Request, res: Response): Promise<Response> {
  const leaveCredits = await leaveCreditsService.fetchLeaveCredits(req.query);

  return res.status(HttpStatus.OK).json({ data: leaveCredits });
}

export async function fetchLeaveCreditById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const leaveCreditId = parseInt(id, 10);
  const leaveCredit = await leaveCreditsService.fetchLeaveCreditById(leaveCreditId);

  if (!leaveCredit) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Leave credit not found' });
  }

  return res.status(HttpStatus.OK).json({ data: leaveCredit });
}

export async function updateLeaveCredit(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const leaveCreditId = parseInt(id, 10);
  const updates: Partial<LeaveCredit> = req.body;

  const updatedLeaveCredit = await leaveCreditsService.updateLeaveCredit(leaveCreditId, updates);

  return res.status(HttpStatus.OK).json({ data: updatedLeaveCredit });
}

export async function deleteLeaveCredit(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const leaveCreditId = parseInt(id, 10);
  await leaveCreditsService.deleteLeaveCredit(leaveCreditId);

  return res.status(HttpStatus.NO_CONTENT).send();
}
