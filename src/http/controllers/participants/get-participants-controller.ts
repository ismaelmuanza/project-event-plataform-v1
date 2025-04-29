import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaParticipantRepository } from '@/repositories/prisma/prisma-participant-repository';
import { GetParticipantsUseCase } from '@/use-cases/participants/get-participants-use-case';

export async function getParticipantsController(request: FastifyRequest, reply: FastifyReply) {
 
    try {
    
        const participantRepository = new PrismaParticipantRepository();
        const getParticipatsUseCase = new GetParticipantsUseCase(participantRepository);

        const participants = await getParticipatsUseCase.execute();

        return reply.status(200).send({participants});

    } catch (err) {

        throw err
    }
}