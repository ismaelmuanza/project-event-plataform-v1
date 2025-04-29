import { ParticipantRepositoryInterface } from '@/repositories/interface/participant-repository-interface';

interface GetParticipantByIdAndEventIdRequets {
  eventId: string
  participantId: string
}
export class GetParticipantByIdAndEventIdUseCase {
  constructor(private participantRepository: ParticipantRepositoryInterface) {}

  async execute({eventId, participantId}: GetParticipantByIdAndEventIdRequets) {
    const participant = await this.participantRepository.findParticipantByIdAndEventId({eventId, participantId});

    if (!participant) {
      throw new Error('Participant not found');
    }

    return participant;
  }
}