import { Prisma, Event } from '@prisma/client';
import { EventRepositoryInterface, EventRquest } from '../interface/event-repository-interface';
import { prisma } from '@/lib/prisma';
import crypto from 'node:crypto';

export class PrismaEventRepository implements EventRepositoryInterface {

  async create(data: Prisma.EventUncheckedCreateInput) {
    const event = await prisma.event.create({
      data: {
        ...data,
        id: data.id ?? crypto.randomUUID(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return event;
  }

  async findAll() {
    const events = await prisma.event.findMany();
    
    return events;
  }

  async fetchEventOfCreaterEvent(creater_event: string) {
    const events = await prisma.event.findMany({
      where: { creater_event },
    });
    return events;
  }

  async findById(eventId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    return event;
  }

  async update(data: Prisma.EventUpdateInput & { id: string }) {
    const { id, ...datas } = data;
    const event = await prisma.event.update({
      where: { id },
      data: datas,
    });
    return event;
  }
}