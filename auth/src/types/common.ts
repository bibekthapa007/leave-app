/* eslint-disable @typescript-eslint/no-explicit-any */
export type Any = any;

export interface Designation {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface UserRole {
  id: number;
  name: string;
  userId: number;
  userRoleId: number;
}
export interface DefaultObject {
  [key: string]: Any;
}

export enum Roles {
  ADMIN = 'Admin',
  USER = 'User',
  MANAGER = 'Manager',
}

export interface Country {
  id: number;
  name: string;
}

export interface FiscalYear {
  id: number;
  name: string;
  isCurrent: boolean;
}
