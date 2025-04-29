
// src/use-cases/get-events-by-participant-use-case.ts
import { prisma } from '@/lib/prisma';

export class GetEventsByParticipantService {

  async execute(userId: string) {

    const events = await prisma.participant.findMany({
      where: {
        id: userId
      },
      include: {
        event: true
      },
    });

    return {
      events: events.map((event) => event.event),
    };
  }
}