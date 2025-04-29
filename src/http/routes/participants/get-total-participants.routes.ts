
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getTotalParticipantsController } from '@/http/controllers/participants/get-total-participants-controller';

export const getTotalParticipantsRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/participants/total', {
           schema: {
               tags: ['Participants'],
               summary: 'Get total participants',
               description: 'Returns the total number of participants.',
               security: [
                { bearerAuth: [] },
              ],
              response: {
                200: z.object({
                        total: z.number(),
                    }),
               },
           },
       }, getTotalParticipantsController);
};