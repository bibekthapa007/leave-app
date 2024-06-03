import { MinimalUser, User } from './user';

export interface LeaveType {
  id: number;
  name: string;
  defaultDays: number;
  isTransferable: boolean;
  createtAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export enum LeaveStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
}

export interface LeaveCredit {
  id: number;
  leaveTypeId: number;
  userId: number;
  defaultDays: number;
  maxDays: number;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export interface LeaveRequestBody {
  id: number;
  leaveTypeId: number;
  userId: number;
  fiscalYearId: number;
  managerId?: number;
  startDate: Date;
  endDate: Date;
  status?: LeaveStatusEnum;
  leaveDays: number;
  reason: string;
  createdBy?: number;
  updatedBy?: number;
}

export interface LeaveRequest {
  id: number;
  leaveType: {
    id: number;
    name: string;
  };
  user: MinimalUser | User;
  manager: MinimalUser | User;
  startDate: Date;
  endDate: Date;
  status: LeaveStatusEnum;
  leaveDays: number;
  reason: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
