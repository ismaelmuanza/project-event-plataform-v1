import { redis } from '@/lib/redis';
import { NotificationRepositoryInterface } from './interface/notification-repository-interface';

interface Notification {
  id: string;
  userId: string;
  message: string;
  type: string;
  timestamp: string;
}

export class NotificationRepository implements NotificationRepositoryInterface {
  private redisClient;

  constructor() {
    this.redisClient = redis
  }

  async create(notification: Notification): Promise<void> {
    const notificationKey = `user:${notification.userId}:notifications`;

    // Adicionar a notificação à lista do usuário
    await this.redisClient.lpush(notificationKey, JSON.stringify(notification));

    // Configurar um TTL (opcional, ex.: 24 horas)
    await this.redisClient.expire(notificationKey, 86400); // 86400 segundos = 24 horas
  }

  async getAll(userId: string): Promise<Notification[]> {
    const notificationKey = `user:${userId}:notifications`;

    // Recuperar notificações da lista
    const notifications = await this.redisClient.lrange(notificationKey, 0, -1);

    return notifications.map((notification) => JSON.parse(notification));
  }

  async deleteAllOfUserId(userId: string): Promise<void> {
    const notificationKey = `user:${userId}:notifications`;
    await this.redisClient.del(notificationKey);
  }

  async deleteId(id: string): Promise<void> {
    const notificationKey = `notification:${id}:NOTIFICATION`;
    await this.redisClient.del(notificationKey);
  }
}