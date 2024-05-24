import { Designation, Role } from './common';

export interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  department: string;
  designation: Designation;
  phone: string;
  roles: Role[];
}
