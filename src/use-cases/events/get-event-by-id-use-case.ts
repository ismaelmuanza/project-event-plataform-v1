import { EventRepositoryInterface } from '@/repositories/interface/event-repository-interface';

export class GetEventByIdUseCase {
  constructor(private userRepository: EventRepositoryInterface) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}