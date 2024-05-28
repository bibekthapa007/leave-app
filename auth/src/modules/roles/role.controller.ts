import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as roleService from './role.service';

/**
 * Get all roles.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getRoles = async (req: Request, res: Response) => {
  const roles = await roleService.getRoles({});

  return res.status(HttpStatus.OK).json({ data: roles });
};
