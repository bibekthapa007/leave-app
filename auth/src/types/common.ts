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

export interface DefaultObject {
  [key: string]: Any;
}

export enum RoleTypeEnum {
  ADMIN = 'Admin',
  USER = 'User',
  Manager = 'Manager',
}

export interface Country {
  id: number;
  name: string;
}
