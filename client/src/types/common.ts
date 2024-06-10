// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export interface CustomError {
  message: string;
  status: number;
}

export interface Role {
  id: number;
  name: string;
}

export interface Designation {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface LeaveType {
  id: number;
  name: string;
}

export interface LeaveCredit {
  id: number;
  leaveTypeId?: number;
  leaveType: {
    id: number;
    name: string;
  };
  userId: number;
  leaveDays: number;
  takenDays: number;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export interface FiscalYear {
  id: number;
  startDate: string;
  endDate: string;
  countryId: number;
}

export interface LeaveRequest {
  id: number;
  name: string;
  status: string;
  user: User;
  startDate: string;
  endDate: string;
}

export interface DefaultObject {
  [key: string]: Any;
}
