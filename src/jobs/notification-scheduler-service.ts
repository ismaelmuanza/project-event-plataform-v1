import Redis from "ioredis";

interface ScheduledNotification {
  userId: string;
  message: string;
  type: string;
  date: Date; // Quando deve ser enviada
}

export class NotificationSchedulerService {
  constructor(private redisClient: Redis) {}

  async scheduleNotification(notification: ScheduledNotification): Promise<void> {
    const scheduledKey = 'scheduled_notifications';

    const data = {
      userId: notification.userId,
      message: notification.message,
      type: notification.type,
    };

    // Pontuação é o timestamp em segundos
    const score = Math.floor(notification.date.getTime() / 1000);

    await this.redisClient.zadd(
      scheduledKey,
      score.toString(),
      JSON.stringify(data)
    );

    console.log(`Notification scheduled for ${notification.date.toISOString()}`);
  }
}
