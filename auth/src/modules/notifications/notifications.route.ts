import { Router } from 'express';

import * as notificationController from './notifications.controller';

const router = Router();

router.get('/notifications', notificationController.fetchNotifications);

router.get('/notifications/:id', notificationController.fetchNotificationById);

router.post('/notifications', notificationController.createNotification);

router.put('/notifications/:id', notificationController.updateNotification);

router.delete('/notifications/:id', notificationController.deleteNotification);

export default router;
