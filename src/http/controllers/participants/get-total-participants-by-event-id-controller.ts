import { FastifyReply, FastifyRequest } from 'fastify';
// import { PrismaParticipantRepository } from '@/repositories/prisma/prisma-participant-repository';
// import { GetParticipantsUseCase } from '@/use-cases/participants/get-participants-use-case';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function getTotalParticipantsByEventIdController(request: FastifyRequest, reply: FastifyReply) {
 
    try {
    
        // const participantRepository = new PrismaParticipantRepository();
        // const getParticipatsUseCase = new GetParticipantsUseCase(participantRepository);

        const getTotalParticipantsByEventSchemaParams = z.object({
            eventId: z.string(),
        });
            
        const { eventId } = getTotalParticipantsByEventSchemaParams.parse(request.params);
        
        const totalParticipantsByEvent = await prisma.participant.count({
            where: {
                event_id: eventId
            }
        });


        return reply.status(200).send({total: totalParticipantsByEvent ? Number(totalParticipantsByEvent) : 0});  

    } catch (err) {

        throw err
    }
}