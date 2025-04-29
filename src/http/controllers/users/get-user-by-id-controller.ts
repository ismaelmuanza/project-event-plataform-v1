import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUserByIdUseCase } from '@/use-cases/users/get-user-by-id-use-case';

export async function getUserByIdController(request: FastifyRequest, reply: FastifyReply) {
 
    try {

        const GetUserByIdSchemaParams = z.object({
            id: z.string(),
        });
    
        const { id } = GetUserByIdSchemaParams.parse(request.params);
        
        const userRepository = new PrismaUserRepository();
        const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

        const user = await getUserByIdUseCase.execute(id);

        return reply.status(200).send({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {

        if (err instanceof Error) {
            return reply.status(404).send({ message: err.message });
        }

        throw err
    }
}