import { Request } from 'express';

import { Any } from '@/types/common';

export function updateSessions(req: Request, sessions: Any): void {
  req.session = {
    ...sessions,
    ...req.session,
  };

  return;
}
