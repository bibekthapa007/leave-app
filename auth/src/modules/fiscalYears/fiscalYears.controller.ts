import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as fiscalYearService from './fiscalYears.service';

/**
 * Get all fiscal years.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchFiscalYears = async (req: Request, res: Response) => {
  try {
    const fiscalYears = await fiscalYearService.fetchFiscalYears({});
    return res.status(HttpStatus.OK).json({ data: fiscalYears });
  } catch (error) {
    console.error('Error fetching fiscal years:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};
