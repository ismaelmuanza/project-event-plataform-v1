import cron from 'node-cron';
import { addHours } from 'date-fns';
import { NotificationRepositoryInterface } from '@/repositories/interface/notification-repository-interface';

interface ScheduledNotification {
  userId: string;
  message: string;
  type: string;
  date: Date;
}

export class SchedulerService {
  private notificationsRepository: NotificationRepositoryInterface;
  constructor(notificationsRepository: NotificationRepositoryInterface) {
    this.notificationsRepository = notificationsRepository;
  }

  scheduleNotification(notification: ScheduledNotification): void {

    const { userId, message, type, date } = notification;
    
    // Ajustar a data para UTC+1
    const adjustedDate = addHours(date, 1);

    const cronTime = `${adjustedDate.getMinutes()} ${adjustedDate.getHours()} ${adjustedDate.getDate()} ${adjustedDate.getMonth() + 1} *`;

    cron.schedule(cronTime, async () => {
      await this.notificationsRepository.create({
          id: crypto.randomUUID(),
          userId,
          message,
          type,
          timestamp: new Date().toDateString()
      });
    });

    console.log(`Notification scheduled for user ${userId} at ${adjustedDate.toISOString()}`);
  }

}