import { describe, it, expect, beforeEach } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserByEmailController } from './get-user-by-email-controller';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUserByEmailUseCase } from '@/use-cases/users/get-user-by-email-use-case';
import { z } from 'zod';
import { vi } from 'vitest';

describe('getUserByEmailController', () => {
  let request: FastifyRequest;
  let reply: FastifyReply;
  let userRepository: PrismaUserRepository;
  let getUserByEmailUseCase: GetUserByEmailUseCase;

  beforeEach(() => {
    userRepository = new PrismaUserRepository();
    getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
    request = {
      params: {
        email: 'johndoe@example.com',
      },
    } as FastifyRequest;
    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;
  });

  it('should return a user by email', async () => {

    const user = await getUserByEmailUseCase.execute('johndoe@example.com');

    await getUserByEmailController(request, reply);

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

  it('should bd able return a 404 error if user is not found', async () => {

    // request.params.email = 'non-existent-email@example.com';
    (request.params as { email: string }).email = 'non-existent-email@example.com';
    await getUserByEmailController(request, reply);
    expect(reply.status).toHaveBeenCalledTimes(1);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledTimes(1);
    expect(reply.send).toHaveBeenCalledWith({ message: 'User not found' });
  });

  // it('should throw an error if there is an internal server error', async () => {
  //   vi.spyOn(getUserByEmailUseCase, 'execute').mockRejectedValue(new Error('Internal server error'));
  //   await expect(getUserByEmailController(request, reply)).rejects.toThrow('Internal server error');
  // });

  // it('should validate the request params', async () => {
  //   const schema = z.object({
  //     email: z.string(),
  //   });
  //   const invalidRequest = {
  //     params: {
  //       email: 123,
  //     },
  //   } as FastifyRequest;
  //   await expect(getUserByEmailController(invalidRequest, reply)).rejects.toThrow(
  //     'Invalid request params'
  //   );
  // });
});