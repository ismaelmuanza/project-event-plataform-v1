import { ParticipantRepositoryInterface } from '@/repositories/interface/participant-repository-interface';

export class GetParticipantsUseCase {
  constructor(private participantRepository: ParticipantRepositoryInterface) {}

  async execute() {
    const participants = await this.participantRepository.findAll();

    return participants;
  }
}