import { createEventController } from '../../controllers/events/create-event-controller';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUser } from '../../middlewares/authenticate-user';

export const createEventRoutes: FastifyPluginAsyncZod = async (app) => {
    app.post('/events', {
        preHandler: [authenticateUser],
        schema: {
            tags: ['Events'],
            summary: 'Create a new event',
            description: 'A data dever ser passada no body e seu tipo no input - deve ser date-time-local',
            security: [
                { bearerAuth: [] },
              ],
            body: z.object({
                title: z.string(),
                description: z.string(),
                date: z.string().refine((date) => !isNaN(Date.parse(date)), {
                    message: 'Invalid date format',
                }),
                publishDate: z.coerce.date().optional(),
            }),
            response: {
                201: z.object({
                    event: z.object({
                        id: z.string(),
                        title: z.string(),
                        description: z.string(),
                        date: z.string(),
                        creater_event: z.string(),
                    }),
                }),
                400: z.object({
                    message: z.string(),
                }),
            },
        },
    }, createEventController);
};