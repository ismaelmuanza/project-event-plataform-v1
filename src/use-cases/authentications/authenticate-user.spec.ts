import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-repository-prisma';
import { AuthenticateUserUseCase } from '@/use-cases/authentications/authenticate-user-use-case';
import bcrypt from 'bcrypt';

describe('Authenticate User Use Case', () => {
  let userRepository: InMemoryUserRepository;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

    const passwordHash = await bcrypt.hash('123456', 6);

    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: passwordHash,
    });

  });

  it('should be able authenticate a user with valid credentials', async () => {
    const {user} = await authenticateUserUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    // console.log(token); // Logando o token para verificar o resultado
    expect(user).toHaveProperty('id');
    expect(user.email).toEqual('johndoe@example.com');
    // console.log(user)
  });

  it('should not be able authenticate a user with invalid email', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'invalid@example.com',
        password: '123456',
      }),
    ).rejects.toThrow('Email or Password Incorrect.');
  });

  it('should not authenticate a user with invalid password', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'johndoe@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow('Email or Password Incorrect.');
  });
});