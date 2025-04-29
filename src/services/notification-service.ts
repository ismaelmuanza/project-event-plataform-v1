import { redis } from '@/lib/redis';

interface Notification {
  userId: string;
  message: string;
  type: string; // Exemplo: 'info', 'warning', 'success'
}

export class NotificationService {
  private redisClient;

  constructor() {
    this.redisClient = redis
  }

  async sendNotification(notification: Notification): Promise<void> {
    const channel = `notifications:${notification.userId}`;
    await this.redisClient.publish(channel, JSON.stringify(notification));
  }
}