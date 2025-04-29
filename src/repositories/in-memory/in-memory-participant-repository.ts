import { ParticipantRepositoryInterface } from '@/repositories/interface/participant-repository-interface';
import { Participant, Prisma } from '@prisma/client';
import crypto from 'node:crypto';
import { string } from 'zod';

interface ParticipantRequest {
  id: string;
  name: string;
  email: string;
  event_id: string;
  created_at?: Date;
  updated_at?: Date;
}

interface FindParticipantByIdAndEventIdRequest {
  participantId: string
  eventId: string
}

export class InMemoryParticipantRepository implements ParticipantRepositoryInterface {
  private participants: Participant[] = [];

  async create(data: ParticipantRequest) {

    const participant = {
      id: data.id,
      name: data.name,
      email: data.email,
      event_id: data.event_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.participants.push(participant);
    return participant;
  }

  async findByEmail(email: string) {
    const participant = this.participants.find((p) => p.email === email);
    
    return participant || null;
  }

  async findById(participantId: string) {
    const participant = this.participants.find((p) => p.id === participantId);
    return participant || null;
  }

  async findAll() {
    return this.participants;
  }

  async fetchParticipantsByEvent(event_id: string) {
    const participants = this.participants.filter((p) => p.event_id === event_id);

    return participants 
  }

  async findParticipantByIdAndEventId(data: FindParticipantByIdAndEventIdRequest) {

    const participant = this.participants.find((p) => p.event_id === data.eventId && p.id === data.participantId);

    return participant || null
  }

  async update(participant: Participant) {
    const index = this.participants.findIndex((p) => p.id === participant.id);
    if (index !== -1) {
      this.participants[index] = participant;
    }
    return participant;
  }
}