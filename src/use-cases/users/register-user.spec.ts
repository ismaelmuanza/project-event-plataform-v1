import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RegisterUserUseCase } from '@/use-cases/users/register-user-use-case';
import { SendEmailService } from '@/services/send-email-service';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-repository-prisma';

describe('Register User Use Case', () => {
  let userRepository: InMemoryUserRepository;
  let emailService: SendEmailService;
  let registerUserUseCase: RegisterUserUseCase;
  let mockEmail: boolean;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    emailService = new SendEmailService();
    registerUserUseCase = new RegisterUserUseCase(userRepository, emailService);

    // Variável de controle para alternar entre mock e envio real (false = enviar no servidor)
    mockEmail = true;

    if (mockEmail) {
      vi.spyOn(emailService, 'sendEmail').mockResolvedValue();
    }
  });

  it('should be able register a new user and send a confirmation email', async () => {
    const user = await registerUserUseCase.execute({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    // const userByEmail = await userRepository.findById(user.id)

    // console.log('User By Email:', userByEmail)

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('johndoe@example.com');

    // console.log('User registered:', user);

    if (mockEmail) {
      expect(emailService.sendEmail).toHaveBeenCalledWith({
        to: 'johndoe@example.com',
        subject: 'Welcome to the Platform!',
        html: expect.stringContaining('Thank you for registering'),
      });
    }
  });

  it('should not allow registering a user with an existing email', async () => {
    await registerUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      registerUserUseCase.execute({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
        password: '654321',
      }),
    ).rejects.toThrow('User already exists.');
  });
});