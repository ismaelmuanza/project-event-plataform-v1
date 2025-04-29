import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUsersUseCase } from '@/use-cases/users/get-users-use-case';

export async function getUsersController(request: FastifyRequest, reply: FastifyReply) {

    const userRepository = new PrismaUserRepository();
    const getUsersUseCase = new GetUsersUseCase(userRepository);

    const users = await getUsersUseCase.execute();

    return reply.status(200).send({ users });
}
