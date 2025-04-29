import { NotificationRepositoryInterface } from '@/repositories/interface/notification-repository-interface';

export class GetNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepositoryInterface) {}

  async execute(userId: string) {
    if (!userId) {
      throw new Error('User ID is required.');
    }

    return await this.notificationRepository.getAll(userId);
  }
}