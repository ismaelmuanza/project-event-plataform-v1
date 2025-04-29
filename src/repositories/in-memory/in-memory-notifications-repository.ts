import { NotificationRepositoryInterface } from "../interface/notification-repository-interface";

interface Notification {
  id: string;
  userId: string;
  message: string;
  type: string;
  timestamp: string;
}

export class InMemoryNotificationRepository implements NotificationRepositoryInterface {

  private notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async getAll(userId: string): Promise<Notification[]> {
    return this.notifications.filter((notification) => notification.userId === userId);
  }

  async deleteAllOfUserId(userId: string): Promise<void> {
    this.notifications = this.notifications.filter((notification) => notification.userId !== userId);
  }

  async deleteId(id: string): Promise<void> {
    const index = this.notifications.findIndex((notification) => notification.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
}