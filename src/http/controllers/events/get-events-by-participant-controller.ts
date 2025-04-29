import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { GetEventsByParticipantService } from '@/services/get-events-by-participant-service';

export async function getEventsByParticipantController(request: FastifyRequest, reply: FastifyReply) {
    
    const getEventsByParticipantController = z.object({
        userId: z.string(),
    });

    const { userId } = getEventsByParticipantController.parse(request.params);

    try {

        const getEventsByParticipantService = new GetEventsByParticipantService();


        const events = await getEventsByParticipantService.execute(userId);

        return reply.status(200).send({events});

    } catch (err) {

        if (err instanceof Error) {
            return reply.status(404).send({ message: err.message });
        }
        throw err
    }
}