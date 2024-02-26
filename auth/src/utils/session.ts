import { Request } from 'express';

export function updateSessions(req: Request, sessions: any): void {
  req.session = {
    ...sessions,
    ...req.session,
  };

  return;
}
