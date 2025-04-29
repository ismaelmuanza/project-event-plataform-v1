import { FastifyReply, FastifyRequest } from 'fastify';
// import { PrismaParticipantRepository } from '@/repositories/prisma/prisma-participant-repository';
// import { GetParticipantsUseCase } from '@/use-cases/participants/get-participants-use-case';
import { prisma } from '@/lib/prisma';

export async function getTotalParticipantsController(request: FastifyRequest, reply: FastifyReply) {
 
    try {
    
        // const participantRepository = new PrismaParticipantRepository();
        // const getParticipatsUseCase = new GetParticipantsUseCase(participantRepository);
        
        const totalParticipants = await prisma.participant.count();


        return reply.status(200).send({total: totalParticipants ? Number(totalParticipants) : 0});  

    } catch (err) {

        throw err
    }
}