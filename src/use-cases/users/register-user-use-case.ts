import { User } from '@/entities/user';
import bcrypt from 'bcrypt';
import { SendEmailService } from '@/services/send-email-service';
import { UserRepositoryInterface } from '@/repositories/interface/user-repository-interface';
import { addHours } from 'date-fns';

interface RegisterUserRequest {
  id?: string
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private emailService: SendEmailService,
  ) {}

  async execute(data: RegisterUserRequest) {

    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 6);

    const user = await this.userRepository.create({
      id: data.id,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      created_at: addHours(new Date(), 1), // Ajustar para UTC+1
    });

    // Enviar e-mail de confirmação
    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Welcome to the Platform!',
      html: `<p>Hello ${user.name},</p><p>Thank you for registering. Please confirm your email to activate your account.</p>`,
    });

    return user;
  }
}