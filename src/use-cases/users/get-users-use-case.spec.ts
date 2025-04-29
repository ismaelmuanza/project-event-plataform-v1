import { describe, it, expect, beforeEach } from 'vitest';
import { GetUsersUseCase } from './get-users-use-case';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-repository-prisma';

describe('GetUsersUseCase', () => {
  let getUsersUseCase: GetUsersUseCase;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    getUsersUseCase = new GetUsersUseCase(userRepository);
  });

  it('should be able return all users', async () => {
    // Arrange
    await userRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await userRepository.create({
      id: 'user-2',
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '654321',
    });

    // Act
    const users = await getUsersUseCase.execute();

    // Assert
    expect(users).toHaveLength(2);
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'user-1', name: 'John Doe' }),
        expect.objectContaining({ id: 'user-2', name: 'Jane Doe' }),
      ])
    );

    // console.log(users)
  });
});