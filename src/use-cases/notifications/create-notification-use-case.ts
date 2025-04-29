import { NotificationRepositoryInterface } from '@/repositories/interface/notification-repository-interface';
import crypto from 'node:crypto';
import {addHours} from 'date-fns'

interface CreateNotificationRequest {
  userId: string;
  message: string;
  type: string;
}

export class CreateNotificationUseCase {
  constructor(private notificationRepository: NotificationRepositoryInterface) {}

  async execute(data: CreateNotificationRequest): Promise<void> {
    if (!data.userId || !data.message || !data.type) {
      throw new Error('Invalid notification data.');
    }

    const notification = {
      id: crypto.randomUUID(),
      userId: data.userId,
      message: data.message,
      type: data.type,
      timestamp: addHours(new Date(), 1).toISOString(),
    };

    await this.notificationRepository.create(notification);
  }
}