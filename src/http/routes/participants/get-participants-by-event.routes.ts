
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {  getParticipantsByEventIdController } from '../../controllers/participants/get-participants-by-event-controller';

export const getParticipantsByEventRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/participants/event/:eventId', {
           schema: {
               tags: ['Participants'],
               summary: 'Get participant by Eventy ID',
               description: 'Returns a participant by their event ID.',
               security: [
                { bearerAuth: [] },
              ],
               params: z.object({
                eventId: z.string(),
               }),
               response: {
                200: z.object({
                participants: z.array(
                    z.object({
                        id: z.string(),
                            email: z.string(),
                            name: z.string(),
                            event_id: z.string(),
                            created_at: z.coerce.date(),
                            updated_at: z.coerce.date(),
                    }),  
                ),
            }),
            
           },
           },
       }, getParticipantsByEventIdController);
};