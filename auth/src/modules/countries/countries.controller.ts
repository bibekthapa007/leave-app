import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as countrieService from './countries.service';

/**
 * Get all countries.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchCountries = async (req: Request, res: Response) => {
  const countries = await countrieService.fetchCountries({});

  return res.status(HttpStatus.OK).json({ data: countries });
};
