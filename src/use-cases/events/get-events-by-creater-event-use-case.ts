import { EventRepositoryInterface } from '@/repositories/interface/event-repository-interface';

export class GetEventsByCreaterEventUseCase {
  constructor(private eventRepository: EventRepositoryInterface) {}

  async execute(creater_event: string) {
    if (!creater_event) {
      throw new Error('Creater Event is required.');
    }

    const events = await this.eventRepository.fetchEventOfCreaterEvent(creater_event);

    if (!events || events.length === 0) {
      return [];
    }
    return events;
  }
}