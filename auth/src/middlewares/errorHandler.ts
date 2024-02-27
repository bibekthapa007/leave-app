import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import logger from 'services/logger';
import { buildError } from 'utils/buildError';

const log = logger.withNamespace('errors');

/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 */
export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatus.NOT_FOUND).json({
    errors: [
      {
        code: HttpStatus.NOT_FOUND,
        message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      },
    ],
  });
}

export function genericErrorHandler(
  err: any, //eslint-disable-line @typescript-eslint/no-explicit-any
  req: Request,
  res: Response,
  next: NextFunction //eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (err.stack) {
    log.error(err.stack);
  } else {
    log.error(err.message);
  }

  const errors = buildError(err);

  return res.status(err.statusCode || 500).json({ errors });
}
