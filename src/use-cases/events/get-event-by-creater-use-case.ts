import { EventRepositoryInterface } from '@/repositories/interface/event-repository-interface';

export class GetEventByCreatedUseCase {
  constructor(private eventRepository: EventRepositoryInterface) {}

  async execute(id: string) {
    const events = await this.eventRepository.fetchEventOfCreaterEvent(id);

    return events;
  }
}