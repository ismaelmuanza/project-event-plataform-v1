import { UserRepositoryInterface } from '@/repositories/interface/user-repository-interface';

export class GetUserByEmailUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}