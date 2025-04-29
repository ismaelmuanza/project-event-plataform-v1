
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getEventsByCreaterController } from '../../controllers/events/get-event-by-creater-controller';

export const getEventsByCreaterRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/events/creater/:userId', {
           schema: {
               tags: ['Events'],
               summary: 'Get Events by Creater',
               description: 'Returns events by their Creater.',
               params: z.object({
                   userId: z.string(),
               }),
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
                   404: z.object({
                       message: z.string(),
                   }),
               },
           },
       }, getEventsByCreaterController);
};