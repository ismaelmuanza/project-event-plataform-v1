
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { deleteNotificationsByIdController } from '@/http/controllers/notifications/delete-notification-by-id-controller';

export const deleteNotificationByIdRoutes: FastifyPluginAsyncZod = async (app) => {
       app.delete('/notifications/:id', {
           schema: {
               tags: ['Notifications'],
               summary: 'Delete notification by ID',
               description: 'Delete the notification by their ID.',
               params: z.object({
                   id: z.string(),
               }),
               response: {
                200: z.object({
                    message: z.string(),
                }),
                404: z.object({
                    message: z.string(),
                }),
            },
           },
       }, deleteNotificationsByIdController);
};