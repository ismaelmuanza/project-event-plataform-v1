// import { authenticateUser } from '@/middlewares/authenticate-user';
import { registerParticipantController } from '../../controllers/participants/register-participant-controller';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUser } from '../../middlewares/authenticate-user';
export const registerParticipantRoutes: FastifyPluginAsyncZod = async (app) => {
    app.post('/participants/:eventId', {
      preHandler: [authenticateUser], // Continua protegido no backend
      schema: {
        tags: ['Participants'],
        summary: 'Register a new participant',
        description: 'Registers a new participant for an event.',
        security: [
          { bearerAuth: [] },
        ],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        params: z.object({
          eventId: z.string(),
        }),
        response: {
          201: z.object({
            participant: z.object({
              id: z.string(),
              event_id: z.string(),
              name: z.string(),
              email: z.string(),
            }),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
      
    }, registerParticipantController);
  };
  