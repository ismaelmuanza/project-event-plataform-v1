import { describe, it, expect, beforeEach } from 'vitest';

import { InMemoryEventRepository } from '@/repositories/in-memory/in-memory-event-repository';
import { GetEventsByCreaterEventUseCase } from './get-events-by-creater-event-use-case';

describe('GetEventsByCreaterEventUseCase', () => {
  let eventRepository: InMemoryEventRepository;
  let getEventsByCreaterEventUseCase: GetEventsByCreaterEventUseCase;

  beforeEach(() => {
    eventRepository = new InMemoryEventRepository();
    getEventsByCreaterEventUseCase = new GetEventsByCreaterEventUseCase(eventRepository);
  });

  it('should return all events for a given user', async () => {

        const eventData = {
              id: 'event-123',
              title: 'Test Event 1',
              description: 'This is a test event.',
              date: new Date(Date.now() + 60 * 60 * 1000), // 1 hora no futuro
              publishDate: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos no futuro
              creater_event: 'user-123',
              status: 'pending',
            };

             const eventData2 = {
                  id: '123-2',
                  title: 'Test Event 2',
                  description: 'This is a test event.',
                  date: new Date(Date.now() + 60 * 60 * 1000), // 1 hora no futuro
                  publishDate: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos no futuro
                  creater_event: 'user-123',
                  status: 'pending',
                };
            
                await eventRepository.create(eventData);
                await eventRepository.create(eventData2);

                const events = await getEventsByCreaterEventUseCase.execute('user-123');

                expect(events).toHaveLength(2);
                expect(events[0].title).toBe('Test Event 1');
                expect(events[1].title).toBe('Test Event 2');
  });

  it('should be able return an empty array if the user has no events', async () => {
    const events = await getEventsByCreaterEventUseCase.execute('user-456');
    expect(events).toHaveLength(0);
  });

  it('should be able throw an error if creater event is not provided', async () => {
    await expect(getEventsByCreaterEventUseCase.execute('')).rejects.toThrow('Creater Event is required.');
  });
});