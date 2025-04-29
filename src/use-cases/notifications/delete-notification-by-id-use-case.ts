import { NotificationRepositoryInterface } from '@/repositories/interface/notification-repository-interface';

export class DeleteNotificationByIdUseCase {
  constructor(private notificationRepository: NotificationRepositoryInterface) {}

  async execute(id: string) {

    await this.notificationRepository.deleteId(id);
  }
}