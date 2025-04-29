import { ParticipantRepositoryInterface } from '@/repositories/interface/participant-repository-interface';

export class GetParticipantByEmailUseCase {
  constructor(private participantRepository: ParticipantRepositoryInterface) {}

  async execute(email: string) {
    const participant = await this.participantRepository.findByEmail(email);

    if (!participant) {
      throw new Error('Participant not found');
    }

    return participant;
  }
}