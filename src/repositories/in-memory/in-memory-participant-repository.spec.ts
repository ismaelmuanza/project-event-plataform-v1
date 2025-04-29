import { InMemoryParticipantRepository } from './in-memory-participant-repository';
import { Participant } from '@prisma/client';
import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from './in-memory-repository-prisma';

describe('InMemoryParticipantRepository', () => {
  let participantRepository: InMemoryParticipantRepository;
  let registerUserUseCase: InMemoryUserRepository;

  beforeEach(() => {
    participantRepository = new InMemoryParticipantRepository();
    registerUserUseCase = new InMemoryUserRepository();
  });

  it('should create a participant', async () => {

    const participantData = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      event_id: 'event-1',
    };

    const participant = await participantRepository.create(participantData);

    expect(participant).toMatchObject(participantData);
    expect(participant.created_at).toBeDefined();
    expect(participant.updated_at).toBeDefined();
  });

  it('should find a participant by ID', async () => {
    const participantData = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      event_id: 'event-1',
    };

    await participantRepository.create(participantData);

    const foundParticipant = await participantRepository.findById('1');

    expect(foundParticipant).toMatchObject(participantData);
  });

  it('should return null if participant is not found by ID', async () => {
    const foundParticipant = await participantRepository.findById('non-existent-id');

    expect(foundParticipant).toBeNull();
  });

  it('should fetch all participants', async () => {
    const participant1 = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      event_id: 'event-1',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const participant2 = {
      id: '2',
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      event_id: 'event-2',
      created_at: new Date(),
      updated_at: new Date(),
    };

    await participantRepository.create(participant1);
    await participantRepository.create(participant2);

    const participants = await participantRepository.findAll();

    expect(participants).toHaveLength(2);
    expect(participants).toEqual(expect.arrayContaining([participant1, participant2]));

    // console.log(participants)
  });

  it('should fetch participants by event ID', async () => {
    const participant1 = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      event_id: 'event-1',
    };

    const participant2 = {
      id: '2',
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      event_id: 'event-1',
    };

    const participant3 = {
      id: '3',
      name: 'Jane Doe',
      email: 'janedo3e@example.com',
      event_id: 'event-2',
    };

    await participantRepository.create(participant1);
    await participantRepository.create(participant2);
    await participantRepository.create(participant3);

    const participants = await participantRepository.fetchParticipantsByEvent('event-1');

    expect(participants).toHaveLength(2);
    expect(participants[0]).toMatchObject(participant1);

    // console.log(participants)
    // console.log(participant3)
  });

  it('should update a participant', async () => {
    const participantData = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      event_id: 'event-1',
    };

    const participant = await participantRepository.create(participantData);

    participant.name = 'John Updated';

    const updatedParticipant = await participantRepository.update(participant);

    expect(updatedParticipant.name).toBe('John Updated');

    // console.log(updatedParticipant)
  });
});