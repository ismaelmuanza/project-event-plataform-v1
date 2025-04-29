import { EventRepositoryInterface } from '@/repositories/interface/event-repository-interface';

export class GetEventsUseCase {
  constructor(private eventRepository: EventRepositoryInterface) {}

  async execute() {
    const events = await this.eventRepository.findAll();

    return events;
  }
}