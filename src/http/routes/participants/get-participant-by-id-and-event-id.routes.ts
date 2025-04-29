
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getParticipantByIdAndEventIdController } from '../../controllers/participants/get-participant-by-id-and-event-id-controller';

export const getParticipantByIdAndEventIdRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/participants/id/event/:participantId/:eventId', {
           schema: {
               tags: ['Participants'],
               summary: 'Get participant by ID and Eventy ID',
               description: 'Return a participant by their ID and Event ID.',
               security: [
                { bearerAuth: [] },
              ],
               params: z.object({
                   participantId: z.string(),
                   eventId: z.string(),
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
       }, getParticipantByIdAndEventIdController);
};