import { EventRepositoryInterface, EventRquest } from '@/repositories/interface/event-repository-interface';
import { NotificationRepository } from '@/repositories/notifications-repository';
import { SchedulerService } from '@/services/scheduler-service';
import { Prisma } from '@prisma/client';
import { addHours, differenceInMilliseconds, parseISO, subMinutes } from 'date-fns';
import { CreateNotificationUseCase } from '../notifications/create-notification-use-case';

export interface CreateEventRequest {
  id?: string
  title: string;
  description: string;
  date: Date; // Data do evento
  creater_event: string;
  publishDate?: Date; // Data de publicação (opcional)
  status?: string; // Tornado opcional
}

export class CreateEventUseCase {
  constructor(
    private eventRepository: EventRepositoryInterface,
    private schedulerService: SchedulerService,
  ) {}

  async execute(data: CreateEventRequest) {
    if (!data.title || !data.date || !data.creater_event) {
      throw new Error('Invalid event data.');
    }
    const eventData: Prisma.EventUncheckedCreateInput = {
      id: data.id,
      title: data.title,
      description: data.description,
      creater_event: data.creater_event,
      date: new Date(data.date),
      status: data.publishDate ? 'pending' : 'published',
      publishDate: data.publishDate,
    };

    const event = await this.eventRepository.create({
      ...eventData,
      created_at: addHours(new Date(), 1), // Ajustar para UTC+1
      updated_at: addHours(new Date(), 1), // Ajustar para UTC+1
    });

    // creating notification
    const notificationRepository = new NotificationRepository();
    const createNotificationUseCase = new CreateNotificationUseCase(notificationRepository);

    const notification = {
      message: `Event - ${event.title} created with success.`,
      type: `info`,
      userId: event.creater_event
  }

  
  if(!data.publishDate) {
      // Publicação imediata: enviar notificação
        await createNotificationUseCase.execute(notification)

        await this.schedulerService.scheduleNotification({
          message: `Event - ${event.title} Começará daqui a 2 minutos.`,
          type: `info`,
          userId: event.creater_event,
          date: event.date
        })
        
      // setTimeout(async () => {
      //   await createNotificationUseCase.execute({
      //     message: `Event - ${event.title} Começará daqui a 2 minutos.`,
      //     type: `info`,
      //     userId: event.creater_event,
      //   })
        
      // }, 5000)

    } 

    // if (data.publishDate) {
    //   // Agendar a publicação do evento
    //   const publishDate = new Date(data.publishDate);
    //   this.schedulerService.scheduleEventPublication(event.id, publishDate);

    //   // Agendar notificação para a publicação do evento
    //   this.schedulerService.scheduleNotification({
    //     userId: data.creater_event,
    //     message: `Your event "${data.title}" has been published!`,
    //     type: 'event-published',
    //     date: publishDate,
    //   });
    // } else {
    //   // Publicação imediata: enviar notificação
    //   this.schedulerService.scheduleNotification({
    //     userId: data.creater_event,
    //     message: `Your event "${data.title}" has been created and published!`,
    //     type: 'event-created',
    //     date: new Date(),
    //   });
    // }

    // // Agendar notificação para o evento (30 minutos antes)
    // const eventDate = new Date(data.date);
    // const notificationDate = new Date(eventDate.getTime() - 30 * 60 * 1000); // 30 minutos antes do evento
    // this.schedulerService.scheduleNotification({
    //   userId: data.creater_event,
    //   message: `Reminder: Your event "${data.title}" is starting soon!`,
    //   type: 'reminder',
    //   date: notificationDate,
    // });

    return event
  }
}