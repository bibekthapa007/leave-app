import HttpStatus from 'http-status-codes';

import BaseError from '@/errors/baseError';

import { BuildError } from '@/types/error';

//TODO: Need to remove this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildError = (error: any): BuildError[] => {
  if (error instanceof BaseError) {
    return error.serializeErrors();
  }

  return [
    {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong',
    },
  ];
};
