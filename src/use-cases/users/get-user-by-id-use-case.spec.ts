import { describe, it, expect, beforeEach } from 'vitest';
import { GetUserByIdUseCase } from './get-user-by-id-use-case';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-repository-prisma';

describe('GetUserByIdUseCase', () => {
  let getUserByIdUseCase: GetUserByIdUseCase;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
  });

  it('should be able return a user by ID', async () => {
    // Arrange
    const user = await userRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    // Act
    const foundUser = await getUserByIdUseCase.execute(user.id);

    // Assert
    expect(foundUser).toEqual(
      expect.objectContaining({ id: 'user-1', name: 'John Doe' })
    );

    console.log(foundUser)
  });


  it('should be able throw an error if user is not found', async () => {
    // Act & Assert
    await expect(getUserByIdUseCase.execute('non-existent-id')).rejects.toThrow('User not found');
  });
});