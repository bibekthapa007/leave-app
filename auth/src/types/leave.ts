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

export interface LeaveRequest {
  id: number;
  leaveTypeId: number;
  userId: number;
  managerId: number;
  startDate: Date;
  endDate: Date;
  status: string;
  leaveDays: number;
  reason: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
