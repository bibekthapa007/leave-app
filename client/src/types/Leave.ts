export enum LeaveTypeEnum {
  SICK = 'SICK',
  CASUAL = 'CASUAL',
  ANNUAL = 'ANNUAL',
  UNPAID = 'UNPAID',
}

export interface Leave {
  id: number;
  description: string;
  date: string;
  status: string;
  type: LeaveTypeEnum;
  createdAt?: string;
  updatedAt?: string;
}
