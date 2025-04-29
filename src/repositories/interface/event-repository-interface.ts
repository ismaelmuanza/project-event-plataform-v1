import { Prisma, Event } from '@prisma/client';

export interface EventRquest {
  id: string;
  title: string;
  description: string;  
  date: Date; // Data do evento
  creater_event: string;
  status: string;
  publishDate?: Date | null; // Data de publicação (opcional)
  created_at?: Date,
  updated_at?: Date,
}
  
export interface EventRepositoryInterface {
  create(event: Prisma.EventUncheckedCreateInput): Promise<EventRquest>;
  findAll(): Promise<Event[]>;
  fetchEventOfCreaterEvent(creater_event: string): Promise<Event[] | null>;
  findById(eventId: string): Promise<Event | null>;
  update(event: Prisma.EventUpdateInput & { id: string }): Promise<Event>;

}