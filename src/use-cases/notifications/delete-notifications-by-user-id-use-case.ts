import { NotificationRepositoryInterface } from '@/repositories/interface/notification-repository-interface';

export class DeleteNotificationsByUserIdUseCase {
  constructor(private notificationRepository: NotificationRepositoryInterface) {}

  async execute(userId: string) {
    if (!userId) {
      throw new Error('User ID is required.');
    }

    await this.notificationRepository.deleteAllOfUserId(userId);
  }
}