import { Designation, Role } from './common';

export interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  department: string;
  designationId?: number;
  designation: Designation;
  phone: string;
  roles: Role[];
}

export interface UserFilters {
  id?: number;
  email?: string;
}

export type UserBody = Omit<User, 'id'>;
