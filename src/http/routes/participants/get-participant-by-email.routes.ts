
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getParticipantByEmailController } from '../../controllers/participants/get-participant-by-email-controller';

export const getParticipantByEmailRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/participants/email/:email', {
           schema: {
               tags: ['Participants'],
               summary: 'Get participant by EMAIL',
               description: 'Returns a participant by their email.',
               security: [
                { bearerAuth: [] },
              ],
               params: z.object({
                   email: z.string(),
               }),
               response: {
                   200: z.object({
                       participant: z.object({
                           id: z.string(),
                           email: z.string(),
                            name: z.string(),
                            event_id: z.string(),
                            created_at: z.coerce.date(),
                            updated_at: z.coerce.date(),
                       }),
                   }),
                   404: z.object({
                       message: z.string(),
                   }),
               },
           },
       }, getParticipantByEmailController);
};