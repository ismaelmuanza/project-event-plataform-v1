import { describe, it, expect, beforeEach } from 'vitest';
import { FetchParticipantsUseCase } from './fetch-participants-use-case';
import { InMemoryParticipantRepository } from '@/repositories/in-memory/in-memory-participant-repository';
import { InMemoryEventRepository } from '@/repositories/in-memory/in-memory-event-repository';
import { addHours } from 'date-fns';

describe('FetchParticipantsUseCase', () => {
  let participantRepository: InMemoryParticipantRepository;
  let eventRepository: InMemoryEventRepository;
  let fetchParticipantsUseCase: FetchParticipantsUseCase;
  
  beforeEach(() => {
    participantRepository = new InMemoryParticipantRepository();
    eventRepository = new InMemoryEventRepository();
    fetchParticipantsUseCase = new FetchParticipantsUseCase(participantRepository, eventRepository);
  });

  it('should be able fetch participants of an existing event', async () => {

    const eventData = {
      id: 'event-123',
      title: 'Test Event',
      description: 'This is a test event.',
      date: addHours(new Date(Date.now() + 60 * 60 * 1000), 1), // Ajustar para UTC+1
      status: 'published',
      creater_event: 'user-123',
    };

    await eventRepository.create(eventData); // Salvar o evento diretamente no repositório

    await participantRepository.create({
      id: 'participant-1',
      event_id: 'event-123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      created_at: new Date(),
      updated_at: new Date()
    });

    await participantRepository.create({
      id: 'participant-2',
      event_id: 'event-123',
      name: 'Jane Doe',
      email: 'janedoe@example.com'
    });

    const participants = await fetchParticipantsUseCase.execute({ event_id: 'event-123' });

    expect(participants).toHaveLength(2);
    expect(participants).toEqual(expect.arrayContaining([participants[0], participants[1]]));

    // console.log(participants);
  });

  it('should throw an error if the event does not exist', async () => {
    await expect(
      fetchParticipantsUseCase.execute({ event_id: 'non-existent-event' })
    ).rejects.toThrow('Event does not exist.');
  });
});