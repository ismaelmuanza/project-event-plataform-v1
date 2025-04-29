import { describe, it, expect, beforeEach } from 'vitest';
import { CreateNotificationUseCase } from './create-notification-use-case';
import { NotificationRepository } from '@/repositories/notifications-repository';
import { NotificationRepositoryInterface } from '@/repositories/interface/notification-repository-interface';
import { InMemoryNotificationRepository } from '@/repositories/in-memory/in-memory-notifications-repository';

describe('CreateNotificationUseCase', () => {
  let notificationRepository: NotificationRepositoryInterface;
  let createNotificationUseCase: CreateNotificationUseCase;

  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    createNotificationUseCase = new CreateNotificationUseCase(notificationRepository);
  });

  it.only('should create a notification with valid data', async () => {
 
    const notificationData = {
      userId: '123',
      message: 'Test notification',
      type: 'info',
    };

    await createNotificationUseCase.execute(notificationData);

    const notifications = await notificationRepository.getAll('123');
    expect(notifications).toHaveLength(1);
    expect(notifications[0].message).toBe('Test notification');
    console.log(notifications)
  });

  it('should throw an error if data is invalid', async () => {
    await expect(
      createNotificationUseCase.execute({
        userId: '',
        message: '',
        type: '',
      }),
    ).rejects.toThrow('Invalid notification data.');
  });
});