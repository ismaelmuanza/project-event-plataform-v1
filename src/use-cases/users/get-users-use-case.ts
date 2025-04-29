import { UserRepositoryInterface } from '@/repositories/interface/user-repository-interface';

export class GetUsersUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute() {
    const users = await this.userRepository.findAll();
    
    return users;
  }
}