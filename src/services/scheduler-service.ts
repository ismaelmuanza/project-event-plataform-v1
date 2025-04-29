import cron from 'node-cron';
import { NotificationService } from '@/services/notification-service';
import { EventRepositoryInterface } from '@/repositories/interface/event-repository-interface';
import { addHours, differenceInMilliseconds, subMinutes, subSeconds } from 'date-fns';
import { NotificationRepositoryInterface } from '@/repositories/interface/notification-repository-interface';
import { CreateNotificationUseCase } from '@/use-cases/notifications/create-notification-use-case';
import crypto from 'node:crypto'
import { notificationQueue } from '@/jobs/notification-queue';

interface ScheduledNotification {
  userId: string;
  message: string;
  type: string;
  date: Date;
}
interface ScheduledPublication {
  eventId: string; 
  publishDate: Date;

}



export class SchedulerService {
  private notificationsRepository: NotificationRepositoryInterface;
  private eventRepository: EventRepositoryInterface;

  constructor(notificationsRepository: NotificationRepositoryInterface, eventRepository: EventRepositoryInterface) {
    this.notificationsRepository = notificationsRepository;
    this.eventRepository = eventRepository;
  } 

    async scheduleNotification({ userId, message, type, date }: ScheduledNotification) {
      const now = new Date();

  // Subtrai 10 segundos da data agendada
    const scheduledDate = subMinutes(date, 2);

  // Calcula o delay em milissegundos
  const delay = differenceInMilliseconds(scheduledDate, now);

  if (delay <= 0) {
    throw new Error('A data agendada já passou ou é muito próxima.');
  }

  await notificationQueue.add(
    'send-notification',
    { userId, message, type },
    { delay, attempts: 1 }
  );

  // console.log(`🔔 Notificação agendada para ${scheduledDate.toISOString()}`);
  }


//   async scheduleNotification02({ eventId, publishDate }: ScheduledPublication) {
//     const now = new Date();

// // Subtrai 10 segundos da data agendada
//   const scheduledDate = subMinutes(publishDate, 30);

// // Calcula o delay em milissegundos
// const delay = differenceInMilliseconds(scheduledDate, now);

// if (delay <= 0) {
//   throw new Error('A data agendada já passou ou é muito próxima.');
// }

// await notificationQueue.add(
//   'send-notification',
//   { userId, message, type },
//   { delay, attempts: 1 }
// );

// // console.log(`🔔 Notificação agendada para ${scheduledDate.toISOString()}`);
// }
  scheduleEventPublication(eventId: string, publishDate: Date): void {
    const createNotificationUseCase = new CreateNotificationUseCase(this.notificationsRepository)
    // Ajustar a data para UTC+1
    const adjustedPublishDate = addHours(publishDate, 1);

    const cronTime = `${adjustedPublishDate.getMinutes()} ${adjustedPublishDate.getHours()} ${adjustedPublishDate.getDate()} ${adjustedPublishDate.getMonth() + 1} *`;

    cron.schedule(cronTime, async () => {
      const event = await this.eventRepository.findById(eventId);
      if (event) {
        event.status = 'published';
        await this.eventRepository.update(event);

        // Enviar notificação de publicação
        await this.notificationsRepository.create({
          id: crypto.randomUUID(),
          userId: event.creater_event,
          message: `Your event "${event.title}" has been published!`,
          type: 'event-published',
          timestamp: new Date().toDateString()
        });
      }
    });

    console.log(`Event publication scheduled for event ${eventId} at ${adjustedPublishDate.toISOString()}`);
  }
}