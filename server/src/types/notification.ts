export interface Notification {
  id: number;
  userId: number;
  type: string;
  message: string;
  data?: object;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy: number;
  updatedBy?: number;
}

export interface NotificationBody {
  userId: number;
  type: string;
  message: string;
  data?: object;
  isRead: boolean;
  createdBy: number;
  updatedBy?: number;
}
