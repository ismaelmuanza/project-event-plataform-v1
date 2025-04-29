import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaParticipantRepository } from '@/repositories/prisma/prisma-participant-repository';
import { GetParticipantsByEventUseCase } from '@/use-cases/participants/get-participants-by-event-use-case';

export async function getParticipantsByEventIdController(request: FastifyRequest, reply: FastifyReply) {
 
    try {
        const GetParticipantsByEventIdSchemaParams = z.object({
            eventId: z.string(),
        });
    
        const { eventId } = GetParticipantsByEventIdSchemaParams.parse(request.params);
        
        const participantRepository = new PrismaParticipantRepository();
        const getParticipantsByEventUseCase = new GetParticipantsByEventUseCase(participantRepository);

        const participants = await getParticipantsByEventUseCase.execute(eventId);

        return reply.status(200).send({participants});

    } catch (err) {

        throw err
    }
}