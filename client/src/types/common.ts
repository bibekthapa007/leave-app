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
