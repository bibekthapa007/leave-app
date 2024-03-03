import { toast } from 'react-toastify';
import { isArray } from 'lodash';

import { error as errorToast } from '@/utils/toast';

import en, { ToastMessageType } from '@/constants/en';

export function handleError(error: Error | unknown | any) {
  const message =
    error?.response?.data?.error?.message ||
    error?.response?.data?.error ||
    en.toast.SOMETHING_WENT_WRONG;

  const errorMessage = isArray(message) ? message[0] : message;

  errorToast({ title: ToastMessageType.ERROR, message: errorMessage });
}
