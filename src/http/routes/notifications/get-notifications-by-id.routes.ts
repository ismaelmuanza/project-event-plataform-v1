
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getNotificationsByIdController } from '@/http/controllers/notifications/get-notifications-by-id-controller';

export const getNotificationsByIdRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/notifications/:userId', {
           schema: {
               tags: ['Notifications'],
               summary: 'Get notifications by ID',
               description: 'Returns the notifications by their user ID.',
               params: z.object({
                   userId: z.string(),
               }),
               response: {
                200: z.object({
                    notifications: z.array(z.object({
                        id: z.string(),
                        userId: z.string(),
                        message: z.string(),
                        type: z.string(),
                        timestamp: z.string(),
                    })),
                }),
                404: z.object({
                    message: z.string(),
                }),
            },
           },
       }, getNotificationsByIdController);
};