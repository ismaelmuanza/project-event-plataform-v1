import { describe, it, expect, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserByIdController } from './get-user-by-id-controller';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUserByIdUseCase } from '@/use-cases/users/get-user-by-id-use-case';
import { vi } from 'vitest';
import { UserRepositoryInterface } from '@/repositories/interface/user-repository-interface';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-repository-prisma';

describe('getUserByIdController', () => {
  let request: FastifyRequest;
  let reply: FastifyReply;
  let userRepository: UserRepositoryInterface;
  let getUserByIdUseCase: GetUserByIdUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    request = {
      params: {
        id: 'user-1',
      },
    } as FastifyRequest;
    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;
  });

  it.skip('should be able return a user by ID', async () => {

    await userRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    });
    const user = await getUserByIdUseCase.execute('user-1');
    // console.log(user)

    await getUserByIdController(request, reply);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });

  it('should return a 404 error if user is not found', async () => {
    (request.params as { id: string }).id = 'non-existent-id'; //request.params.id = 'non-existent-id';
    // request.params.id = 'non-existent-id';
    await getUserByIdController(request, reply);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith({ message: 'User not found' });
  });

//   it('should throw an error if there is an internal server error', async () => {
//     vi.spyOn(getUserByIdUseCase, 'execute').mockRejectedValue(new Error('Internal server error'));
//     await expect(getUserByIdController(request, reply)).rejects.toThrow('Internal server error');
//   });

//   it('should validate the request params', async () => {
//     const schema = z.object({
//       id: z.string(),
//     });
//     const invalidRequest = {
//       params: {
//         id: 123,
//       },
//     } as FastifyRequest;
//     await expect(getUserByIdController(invalidRequest, reply)).rejects.toThrow(
//       'Invalid request params'
//     );
//   });
});