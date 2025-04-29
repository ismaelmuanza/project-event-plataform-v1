
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { deleteNotificationsByUserIdController } from '@/http/controllers/notifications/delete-notifications-by-user-id-controller';

export const deleteNotificationsByUserIdRoutes: FastifyPluginAsyncZod = async (app) => {
       app.delete('/notifications/user/:userId', {
           schema: {
               tags: ['Notifications'],
               summary: 'Delete notifications of User ID',
               description: 'Delete all the notifications of a user by their ID.',
               params: z.object({
                   userId: z.string(),
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
       }, deleteNotificationsByUserIdController);
};