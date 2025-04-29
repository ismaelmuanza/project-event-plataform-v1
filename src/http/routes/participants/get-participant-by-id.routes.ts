
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getParticipantByIdController } from '../../controllers/participants/get-participant-by-id-controller';

export const getParticipantByIdRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/participants/:id', {
           schema: {
               tags: ['Participants'],
               summary: 'Get participant by ID',
               description: 'Returns a participant by their ID.',
               security: [
                { bearerAuth: [] },
              ],
               params: z.object({
                   id: z.string(),
               }),
               response: {
                   200: z.object({
                       participant: z.object({
                           id: z.string(),
                            name: z.string(),
                            email: z.string(),
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
       }, getParticipantByIdController);
};