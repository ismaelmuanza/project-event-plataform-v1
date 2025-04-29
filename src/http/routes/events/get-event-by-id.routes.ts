
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getEventByIdController } from '../../controllers/events/get-event-by-id-controller';

export const getEventByIdRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/events/:id', {
           schema: {
               tags: ['Events'],
               summary: 'Get Event by ID',
               description: 'Returns a event by their ID.',
               params: z.object({
                   id: z.string(),
               }),
               response: {
                   200: z.object({
                       event: z.object({
                           id: z.string(),
                                 title: z.string(),
                                 description: z.string(),
                                 date: z.coerce.date(),
                                 status: z.string(),
                                 creater_event: z.string(),
                                 publishDate: z.coerce.date(), // Garantir compatibilidade com a interface
                                 created_at: z.coerce.date(),
                                 updated_at: z.coerce.date(),
                       }),
                   }),
                   404: z.object({
                       message: z.string(),
                   }),
               },
           },
       }, getEventByIdController);
};