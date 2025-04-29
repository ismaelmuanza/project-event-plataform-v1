import { EventRepositoryInterface } from '@/repositories/interface/event-repository-interface';
import { Event } from '@prisma/client';
import crypto from 'node:crypto';

interface EventRquest {
  id: string;
  title: string;
  description: string;  
  date: Date; // Data do evento
  creater_event: string;
  status: string;
  publishDate?: Date; // Data de publicação (opcional)
  created_at?: Date,
  updated_at?: Date,
}
export class InMemoryEventRepository implements EventRepositoryInterface {
  private events: Event[] = [];

  async create(data: EventRquest) {
    const event = {
      id: data.id ?? crypto.randomUUID(),
      title: data.title,
      description: data.description,
      date: data.date,
      status: data.status,
      creater_event: data.creater_event,
      publishDate: data.publishDate ?? null, // Garantir compatibilidade com a interface
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.events.push(event);
    return event;
  }

  async findAll() {
    const events = this.events;

    return events
  }

  async fetchEventOfCreaterEvent(creater_event: string) {
  
    const events = this.events.filter(event => event.creater_event === creater_event)
    
    return events || null
  }

  async findById(event_id: string){
    const event = this.events.find((event) => event.id === event_id);

    return event || null;
  }

  async update(event: Event) {
    const index = this.events.findIndex((e) => e.id === event.id);
    if (index !== -1) {
      this.events[index] = event;
    }
    return event
  }

}