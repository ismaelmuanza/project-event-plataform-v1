
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getTotalParticipantsByEventIdController } from '@/http/controllers/participants/get-total-participants-by-event-id-controller';

export const getTotalParticipantsByEventIdRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/participants/total/event/:eventId', {
           schema: {
               tags: ['Participants'],
               summary: 'Get total participants by event',
               description: 'Returns the total number of participants by event ID.',
               security: [  
                { bearerAuth: [] },
              ],
              params: z.object({
                eventId: z.string(),
            }),
              response: {
                200: z.object({
                        total: z.number(),
                    }),
               },
           },
       }, getTotalParticipantsByEventIdController);
};