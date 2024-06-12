import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as notificationService from './notifications.service';

/**
 * Get all notifications.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchNotifications = async (req: Request, res: Response) => {
  const filters = req.query;
  const notifications = await notificationService.fetchNotifications(filters);

  return res.status(HttpStatus.OK).json({ data: notifications });
};

/**
 * Get a notification by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchNotificationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = await notificationService.fetchNotificationById(Number(id));

  if (!notification) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Notification not found' });
  }

  return res.status(HttpStatus.OK).json({ data: notification });
};

/**
 * Create a new notification.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createNotification = async (req: Request, res: Response) => {
  const notificationData = req.body;
  const notification = await notificationService.createNotification(notificationData);

  return res.status(HttpStatus.CREATED).json({ data: notification });
};

/**
 * Update an existing notification.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const notification = await notificationService.updateNotification(Number(id), updates);

  if (!notification) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Notification not found' });
  }

  return res.status(HttpStatus.OK).json({ data: notification });
};

/**
 * Delete a notification.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = await notificationService.deleteNotification(Number(id));

  if (!notification) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Notification not found' });
  }

  return res.status(HttpStatus.OK).json({ data: notification });
};
