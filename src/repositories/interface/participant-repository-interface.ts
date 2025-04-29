import { Participant, Prisma } from '@prisma/client';

interface ParticipantRequest {
    id: string;
    name: string;
    email: string;
    event_id: string;
    created_at?: Date;
    updated_at?: Date;
}

interface FindParticipantByIdAndEventId {
    participantId: string
    eventId: string
}
  
export interface ParticipantRepositoryInterface {
  create(data: Prisma.ParticipantUncheckedCreateInput): Promise<ParticipantRequest>;
  findById(participantId: string): Promise<Participant | null>;
  findByEmail(email: string): Promise<Participant | null>;
  findAll(): Promise<Participant[]>;
  fetchParticipantsByEvent(eventId: string): Promise<Participant[]>;
  findParticipantByIdAndEventId(data: FindParticipantByIdAndEventId): Promise<Participant | null>;
  update(participant: Participant): Promise<Participant>;
}