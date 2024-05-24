import { isArray } from 'lodash';

import { error as errorToast } from '@/utils/toast';

import en, { ToastMessageType } from '@/constants/en';

export function handleError(error: Error | unknown | any) {
  const errors = error?.response?.data?.errors || error?.response?.data?.error;

  const errorMessage = isArray(errors)
    ? error[0]?.message || error[0] || en.toast.SOMETHING_WENT_WRONG
    : error?.message || error || en.toast.SOMETHING_WENT_WRONG;

  console.error(errorMessage);

  errorToast({ title: ToastMessageType.ERROR, message: errorMessage });
}

export function parseError(error: Error | unknown | any) {
  if (error?.response?.data?.errors) {
    return error.response.data.errors;
  }

  if (error?.response?.data) {
    return [error.response.data];
  }

  return [{ message: error.message || error || en.toast.SOMETHING_WENT_WRONG }];
}
