import { UserRepositoryInterface } from '@/repositories/interface/user-repository-interface';

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}