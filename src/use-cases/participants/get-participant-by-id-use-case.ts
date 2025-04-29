import { ParticipantRepositoryInterface } from '@/repositories/interface/participant-repository-interface';

export class GetParticipantByIdUseCase {
  constructor(private participantRepository: ParticipantRepositoryInterface) {}

  async execute(id: string) {
    const participant = await this.participantRepository.findById(id);

    if (!participant) {
      throw new Error('Participant not found');
    }

    return participant;
  }
}