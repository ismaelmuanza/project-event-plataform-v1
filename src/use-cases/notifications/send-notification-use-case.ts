import { NotificationService } from '@/services/notification-service'

interface SendNotificationRequest {
  userId: string;
  message: string;
  type: string;
}

export class SendNotificationUseCase {
  constructor(private notificationService: NotificationService) {}

  async execute(data: SendNotificationRequest): Promise<void> {
    if (!data.userId || !data.message || !data.type) {
      throw new Error('Invalid notification data.');
    }

    await this.notificationService.sendNotification(data);
  }
}