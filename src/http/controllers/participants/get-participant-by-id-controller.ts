import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaParticipantRepository } from '@/repositories/prisma/prisma-participant-repository';
import { GetParticipantByEmailUseCase } from '@/use-cases/participants/get-participant-by-email-use-case';

export async function getParticipantByIdController(request: FastifyRequest, reply: FastifyReply) {
 
    try {
        const GetParticipantByIdSchemaParams = z.object({
            email: z.string(),
        });
    
        const { email } = GetParticipantByIdSchemaParams.parse(request.params);
        
        const participantRepository = new PrismaParticipantRepository();
        const getParticipantByEmailUseCase = new GetParticipantByEmailUseCase(participantRepository);

        const participant = await getParticipantByEmailUseCase.execute(email);

        return reply.status(200).send({participant});

    } catch (err) {

        if (err instanceof Error) {
            return reply.status(404).send({ message: err.message });
        }

        throw err
    }
}