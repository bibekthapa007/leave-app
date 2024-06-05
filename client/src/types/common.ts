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
  name: string;
}

export interface FiscalYear {
  id: number;
  start_date: string;
  end_date: string;
}

export interface DefaultObject {
  [key: string]: Any;
}
