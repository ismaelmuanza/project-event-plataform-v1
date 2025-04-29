import { describe, it, expect, beforeEach } from 'vitest';
import { GetUserByEmailUseCase } from './get-user-by-email-use-case';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-repository-prisma';

describe('GetUserByEmailUseCase', () => {
  let getUserByEmailUseCase: GetUserByEmailUseCase;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
  });

  it('should be able return a user by Email', async () => {
    // Arrange
    const user = await userRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    // Act
    const foundUser = await getUserByEmailUseCase.execute(user.email);

    // Assert
    expect(foundUser).toEqual(
      expect.objectContaining({ id: 'user-1', name: 'John Doe' })
    );

    // console.log(foundUser)
  });

  it('should throw an error if user is not found', async () => {
    // Act & Assert
    await expect(getUserByEmailUseCase.execute('non-existent-email')).rejects.toThrow('User not found');
  });
});