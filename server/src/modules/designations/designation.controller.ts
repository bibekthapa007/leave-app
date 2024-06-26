import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as designationService from './designation.service';

/**
 * Get all designations.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchDesignations = async (req: Request, res: Response) => {
  const designations = await designationService.fetchDesignations({});

  return res.status(HttpStatus.OK).json({ data: designations });
};
