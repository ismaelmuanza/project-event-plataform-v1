import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RegisterParticipantUseCase } from './register-participant-use-case';
import { InMemoryParticipantRepository } from '@/repositories/in-memory/in-memory-participant-repository';
import { SendEmailService } from '@/services/send-email-service';
import { InMemoryEventRepository } from '@/repositories/in-memory/in-memory-event-repository';
import { PrismaParticipantRepository } from '@/repositories/prisma/prisma-participant-repository';
import { addHours } from 'date-fns';


describe('RegisterParticipantUseCase', () => {
  let participantRepository: InMemoryParticipantRepository;
  let eventRepository: InMemoryEventRepository;
  let emailService: SendEmailService;
  let registerParticipantUseCase: RegisterParticipantUseCase;

  beforeEach(() => {
    participantRepository = new InMemoryParticipantRepository();
    eventRepository = new InMemoryEventRepository();
    emailService = new SendEmailService();
    registerParticipantUseCase = new RegisterParticipantUseCase(participantRepository, eventRepository, emailService);

    vi.spyOn(emailService, 'sendEmail').mockResolvedValue();
  });

  it('should be able to register a participant and send a confirmation email', async () => {

      
        const eventData = {
          id: 'event-123',
          title: 'Test Event',
          description: 'This is a test event.',
          date: addHours(new Date(Date.now() + 60 * 60 * 1000), 1), // Ajustar para UTC+1
          status: 'published',
          creater_event: 'user-123',
        };

        const event = await eventRepository.create(eventData)

      await registerParticipantUseCase.execute({
        id: 'participant-123',
        event_id: event.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
    });


    const participants = await participantRepository.fetchParticipantsByEvent('event-123');

    expect(participants).toHaveLength(1);
    expect(participants[0].email).toBe('johndoe@example.com');

    expect(emailService.sendEmail).toHaveBeenCalledWith({
      to: 'johndoe@example.com',
      subject: 'Event Registration Confirmation',
      html: expect.stringContaining('You have successfully registered for the event'),
    });

  });

  it('should not be able to allow duplicate registrations for the same event', async () => {

    const eventData = {
      id: 'event-123',
      title: 'Test Event',
      description: 'This is a test event.',
      date: addHours(new Date(Date.now() + 60 * 60 * 1000), 1), // Ajustar para UTC+1
      status: 'published',
      creater_event: 'user-123',
    };

    const event = await eventRepository.create(eventData)

    await registerParticipantUseCase.execute({
      id: 'participant-123',
      event_id: event.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    await expect(
      registerParticipantUseCase.execute({
        id: 'participant-123',
        event_id: 'event-123',
        name: 'Jane Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toThrow('Participant already registered for this event.');
  });
});