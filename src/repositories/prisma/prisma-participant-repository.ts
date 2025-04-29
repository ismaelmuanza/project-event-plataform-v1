import { Participant, Prisma } from '@prisma/client';
import { ParticipantRepositoryInterface } from '@/repositories/interface/participant-repository-interface';
import { prisma } from '@/lib/prisma';

interface FindParticipantByIdAndEventIdRequest {
    participantId: string
    eventId: string
}

export class PrismaParticipantRepository implements ParticipantRepositoryInterface {

  async create(data: Prisma.ParticipantUncheckedCreateInput) {
    const  participant = await prisma.participant.create({
      data: {
        ...data,
        id: data.id,    
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return participant
  }


  async findByEmail(email: string) {
    const participant = await prisma.participant.findUnique({
      where: {email}
    })

    return participant || null
  }

  async findById(participantId: string) {
    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
    });

    return participant || null
  }

  async findAll() {
    const participants = await prisma.participant.findMany();

    return participants
  }

  async fetchParticipantsByEvent(event_id: string) {
    const particpants = await prisma.participant.findMany({
      where: { event_id },
    });

    return particpants
  }

  async findParticipantByIdAndEventId(data: FindParticipantByIdAndEventIdRequest) {
    const participant = await prisma.participant.findFirst({
      where: {
        id: data.participantId,
        event_id: data.eventId,
      },
    });

    return participant || null

}

  async update(data: Participant) {
    const participant = await prisma.participant.update({
      where: { id: data.id },
      data,
    });

    return participant
  }
}