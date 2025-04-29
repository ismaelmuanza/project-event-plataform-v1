import { describe, it, expect, beforeEach } from 'vitest';
import { GetNotificationsUseCase } from './get-notifications-use-case';
import { InMemoryNotificationRepository } from '@/repositories/in-memory/in-memory-notifications-repository';

describe('GetNotificationsUseCase', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let getNotificationsUseCase: GetNotificationsUseCase;

  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    getNotificationsUseCase = new GetNotificationsUseCase(notificationRepository);
  });

  it('should return all notifications for a given user', async () => {
    const userId = 'user-123';

    // Criar notificações no repositório em memória
    await notificationRepository.create({
      id: '1',
      userId,
      message: 'Notification 1',
      type: 'info',
      timestamp: new Date().toISOString(),
    });

    await notificationRepository.create({
      id: '2',
      userId,
      message: 'Notification 2',
      type: 'warning',
      timestamp: new Date().toISOString(),
    });

    const notifications = await getNotificationsUseCase.execute(userId);
    // console.log(notifications)

    expect(notifications).toHaveLength(2);
    expect(notifications[0].message).toBe('Notification 1');
    expect(notifications[1].message).toBe('Notification 2');
  });

  it('should return an empty array if the user has no notifications', async () => {
    const notifications = await getNotificationsUseCase.execute('user-456');
    expect(notifications).toHaveLength(0);
  });

  it('should throw an error if userId is not provided', async () => {
    await expect(getNotificationsUseCase.execute('')).rejects.toThrow('User ID is required.');
  });
});