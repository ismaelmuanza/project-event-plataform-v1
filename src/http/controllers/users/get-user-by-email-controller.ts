import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUserByEmailUseCase } from '@/use-cases/users/get-user-by-email-use-case';

export async function getUserByEmailController(request: FastifyRequest, reply: FastifyReply) {
    
    const getUserByEmailControllerdSchemaParams = z.object({
        email: z.string(),
    });

    const { email } = getUserByEmailControllerdSchemaParams.parse(request.params);

    try {

        const userRepository = new PrismaUserRepository();
        const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);


        const user = await getUserByEmailUseCase.execute(email);

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