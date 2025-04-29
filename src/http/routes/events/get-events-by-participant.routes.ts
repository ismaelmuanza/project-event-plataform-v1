
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getEventsByParticipantController } from '../../controllers/events/get-events-by-participant-controller';
       
export const getEventsByParticipantRoutes: FastifyPluginAsyncZod = async (app) => {
        app.get('/events/participant/:userId', {
            schema: {
                tags: ['Events'],
                summary: 'Get All Events by Participant registered',
                description: 'Returns all events that a participant is registered.',
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
        }, getEventsByParticipantController);
};
