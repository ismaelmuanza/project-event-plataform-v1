import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { AuthenticateUserUseCase } from '@/use-cases/authentications/authenticate-user-use-case';

export async function authenticateUserController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authenticateSchemaRequest = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });

        const { email, password } = authenticateSchemaRequest.parse(request.body);

        const userRepository = new PrismaUserRepository();
        const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

        const {user} = await authenticateUserUseCase.execute({ email, password });

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: '24h'
            }
        })

        // console.log(request.headers)

        return reply.status(200).send({token});

    } catch (err) {
        if (err instanceof Error) {
            return reply.status(401).send({ message: err.message });
        }

        throw err;
    }
}