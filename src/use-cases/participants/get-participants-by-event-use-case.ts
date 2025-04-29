import { ParticipantRepositoryInterface } from '@/repositories/interface/participant-repository-interface';

export class GetParticipantsByEventUseCase {
  constructor(private participantRepository: ParticipantRepositoryInterface) {}

  async execute(eventId: string) {
    const participant = await this.participantRepository.fetchParticipantsByEvent(eventId);

    return participant;
  }
}