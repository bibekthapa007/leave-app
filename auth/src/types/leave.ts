export interface LeaveType {
  id: number;
  name: string;
  default_days: number;
  is_transferable: boolean;
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
}

export interface LeaveCredit {
  id: number;
  leave_type_id: number;
  user_id: number;
  default_days: number;
  max_days: number;
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
}
