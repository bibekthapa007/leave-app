import { Designation, Role } from './common';

export interface MinimalUser {
  id: number;
  name: string;
  email: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  countryId?: number;
  department: string;
  designationId?: number;
  designation?: Designation;
  manager?: MinimalUser;
  phone: string;
  roles: Role[];
}

export interface UserFilters {
  id?: number;
  email?: string;
}

export type UserBody = Omit<User, 'id'>;
