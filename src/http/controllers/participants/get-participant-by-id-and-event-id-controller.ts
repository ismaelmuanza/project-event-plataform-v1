import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaParticipantRepository } from '@/repositories/prisma/prisma-participant-repository';
import { GetParticipantByIdAndEventIdUseCase } from '@/use-cases/participants/get-participant-by-id-and-event-id-use-case';

export async function getParticipantByIdAndEventIdController(request: FastifyRequest, reply: FastifyReply) {
 
    try {
        const GetParticipantByIdAndEventIdSchemaParams = z.object({
            participantId: z.string(),
            eventId: z.string(),
        });
    
        const { participantId, eventId } = GetParticipantByIdAndEventIdSchemaParams.parse(request.params);
        
        const participantRepository = new PrismaParticipantRepository();
        const getParticipantByIdAndEventIdUseCase = new GetParticipantByIdAndEventIdUseCase(participantRepository);

        const participant = await getParticipantByIdAndEventIdUseCase.execute({participantId, eventId});

        return reply.status(200).send({ participant });

    } catch (err) {

        if (err instanceof Error) {
            return reply.status(404).send({ message: err.message });
        }

        throw err
    }
}