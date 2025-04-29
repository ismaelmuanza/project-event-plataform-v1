
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getParticipantsController } from '../../controllers/participants/get-participants-controller';

export const getParticipantsRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/participants', {
           schema: {
               tags: ['Participants'],
               summary: 'Get participants',
               description: 'Returns all participants.',
               security: [
                { bearerAuth: [] },
              ],
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
       }, getParticipantsController);
};