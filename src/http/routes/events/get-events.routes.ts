
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getEventsController } from '../../controllers/events/get-events-controller';

export const getEventsRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/events', {
           schema: {
               tags: ['Events'],
               summary: 'Get All Events',
               description: 'Returns all events.',
               response: {
                200: z.object({
                    events: z.array(
                        z.object({
                            id: z.string(),
                              title: z.string(),
                              description: z.string(),
                              date: z.coerce.date(),
                              status: z.string(),
                              creater_event: z.string(),
                              publishDate: z.coerce.date(), // Garantir compatibilidade com a interface
                              created_at: z.coerce.date(),
                              updated_at: z.coerce.date(),
                        })   
                    ),
                }),
            },
           },
       }, getEventsController);
};