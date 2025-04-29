import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateEventRequest, CreateEventUseCase } from './create-event-use-case';
import { Prisma } from '@prisma/client';
import { addHours } from 'date-fns';
import { InMemoryEventRepository } from '@/repositories/in-memory/in-memory-event-repository';
import { SchedulerService } from '@/services/scheduler-service';
import { NotificationRepositoryInterface } from '@/repositories/interface/notification-repository-interface';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-repository-prisma';
import { InMemoryNotificationRepository } from '@/repositories/in-memory/in-memory-notifications-repository';

let eventRepository: InMemoryEventRepository;
let schedulerService: SchedulerService;
let createEventUseCase: CreateEventUseCase;
let notificationsRepository: NotificationRepositoryInterface;
let registerUserUseCase: InMemoryUserRepository


describe('CreateEventUseCase', () => {
  
  beforeEach(() => {
    eventRepository = new InMemoryEventRepository();
    notificationsRepository = new InMemoryNotificationRepository();
    schedulerService = new SchedulerService(notificationsRepository, eventRepository);
    vi.spyOn(schedulerService, 'scheduleNotification');
    createEventUseCase = new CreateEventUseCase(eventRepository, schedulerService);
    registerUserUseCase = new InMemoryUserRepository()
  });

  it('should be able to create and publish an event immediately if no publishDate is provided', async () => {

    const user = await registerUserUseCase.create({
      id: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    
    const eventData: CreateEventRequest = {
      id: 'event-123',
      title: 'Test Event',
      description: 'This is a test event.',
      date: addHours(new Date(Date.now() + 60 * 60 * 1000), 1), // Ajustar para UTC+1
      status: 'published',
      creater_event: user.id,
    };

    await createEventUseCase.execute(eventData);

    const events = await eventRepository.fetchEventOfCreaterEvent(user.id);

    // console.log(events)

    expect(events).toHaveLength(1);
    expect(events[0].status).toBe('published');

    expect(schedulerService.scheduleNotification).toHaveBeenCalledWith({
      userId: user.id,
      message: `Your event "Test Event" has been created and published!`,
      type: 'event-created',
      date: expect.any(Date),
    });
  });

  it('should be able to schedule an event for future publication if publishDate is provided', async () => {

    const user = await registerUserUseCase.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const eventData: CreateEventRequest = {
      title: 'Test Event',
      description: 'This is a test event.',
      date: new Date(Date.now() + 60 * 60 * 1000), // 1 hora no futuro
      publishDate: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos no futuro
      creater_event: 'user-123',
      status: 'pending',
    };

    await createEventUseCase.execute(eventData);

    const events = await eventRepository.fetchEventOfCreaterEvent('user-123');
    expect(events).toHaveLength(1);
    expect(events[0].status).toBe('pending');

    expect(schedulerService.scheduleNotification).toHaveBeenCalledWith({
      userId: 'user-123',
      message: `Your event "Test Event" has been published!`,
      type: 'event-published',
      date: expect.any(Date),
    });

    // console.log(events)
  });

  it('should be able to schedule a reminder notification 30 minutes before the event starts', async () => {

    const user = await registerUserUseCase.create({
      id: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const eventData: CreateEventRequest = {
      title: 'Test Event',
      description: 'This is a test event.',
      date: new Date(Date.now() + 60 * 60 * 1000), // 1 hora no futuro
      publishDate: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos no futuro
      creater_event: 'user-123',
    };

    await createEventUseCase.execute(eventData);

    expect(schedulerService.scheduleNotification).toHaveBeenCalledWith({
      userId: 'user-123',
      message: `Reminder: Your event \"Test Event\" is starting soon!`,
      type: 'reminder',
      date: expect.any(Date),
    });
  });

  it('should throw an error if event data is invalid', async () => {
    const invalidEventData: CreateEventRequest = {
      title: '', // Título inválido
      description: 'This is a test event.',
      date: new Date(''), // Data inválida
      creater_event: '', // Usuário inválido
      publishDate: new Date('')

    };

    await expect(createEventUseCase.execute(invalidEventData)).rejects.toThrow('Invalid event data.');
  });
});