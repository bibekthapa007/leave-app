import { Knex } from 'knex';

import { getCurrentUser } from '@/modules/user/user.service';

import { Notification, NotificationBody } from '@/types/notification';

import notificationModel from './notifications.model';

export async function fetchNotifications(
  filters: Partial<Notification> = {}
): Promise<Notification[]> {
  return notificationModel.fetch(filters);
}

export async function fetchNotificationById(id: number): Promise<Notification | undefined> {
  return notificationModel.fetchById(id);
}

export async function createNotification(
  notification: NotificationBody,
  trx?: Knex.Transaction
): Promise<Notification> {
  const currentUser = await getCurrentUser();

  const [notificationCreatedId] = await notificationModel.insert(
    {
      ...notification,
      createdBy: +currentUser?.id,
    },
    trx
  );

  return fetchNotificationById(notificationCreatedId);
}

export async function updateNotification(
  id: number,
  updates: Partial<Notification>
): Promise<Notification> {
  await notificationModel.update(id, updates);

  return await fetchNotificationById(id);
}

export async function deleteNotification(id: number): Promise<Notification> {
  await notificationModel.delete(id);

  return await fetchNotificationById(id);
}
