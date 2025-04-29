
import { ParticipantRepositoryInterface } from '@/repositories/interface/participant-repository-interface';
import { EventRepositoryInterface } from '@/repositories/interface/event-repository-interface';

interface FetchParticipantsEventIdRequest {
  event_id: string;
}

export class FetchParticipantsUseCase {
  constructor(
    private participantRepository: ParticipantRepositoryInterface,
    private eventRepository: EventRepositoryInterface
  ) {}

  async execute(data: FetchParticipantsEventIdRequest) {
    const event = await this.eventRepository.findById(data.event_id);

    if (!event) {
      throw new Error('Event does not exist.');
    }

    const participants = await this.participantRepository.fetchParticipantsByEvent(data.event_id);

    if(!participants) {
      throw new Error('Does not exists participants registereds for this event.')
    }

    return participants
  }
}