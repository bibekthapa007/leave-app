import React from 'react';
import classNames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const ICON_SIZE = 20;

type StatusType = 'success' | 'warning' | 'danger';

interface CustomToastProps {
  statusType: StatusType;
  toastMessage: { title: string; message: string };
  toastClassName?: string;
}

const toasts = {
  danger: {
    className: 'danger',
    icon: <FaTimesCircle size={ICON_SIZE} />,
  },
  success: {
    className: 'success',
    icon: <FaCheckCircle size={ICON_SIZE} />,
  },
  warning: {
    className: 'warning',
    icon: <FaExclamationCircle size={ICON_SIZE} />,
  },
};

function CustomToast({ statusType, toastMessage, toastClassName }: CustomToastProps) {
  const toastType = toasts[statusType];

  return (
    <div>
      {toastType && toastType !== undefined && (
        <div
          className={classNames(
            'flex items-center bg-tertiary-green-60 py-4 px-4 text-white',
            {
              'bg-tertiary-red-60': toastType.className === 'danger',
              'bg-tertiary-yellow-60-60': toastType.className === 'warning',
            },
            toastClassName
          )}
        >
          <div className="self-start leading-0">{toastType.icon}</div>
          <div className="ml-4 text-left">
            <span className="mb-1 font-bold capitalize leading-5">{toastMessage.title}</span>
            <p className="mt-1">{toastMessage.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface NotifyProps {
  autoClose?: number;
  className?: string;
  data: { title: string; message: string };
  draggable?: boolean;
  type: StatusType;
}

export const notify = (props: NotifyProps) => {
  const { autoClose = 2000, data, draggable = false, type } = props;

  // Toast message not showing
  toast(<CustomToast statusType={type} toastMessage={data} />, {
    autoClose,
    closeButton: false,
    draggable,
    hideProgressBar: true,
    progressClassName: 'bg-white',
  });
};

export default function Toast() {
  return <ToastContainer className="lf-toast__container" />;
}
