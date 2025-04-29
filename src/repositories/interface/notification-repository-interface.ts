export interface Notification {
    id: string;
    userId: string;
    message: string;
    type: string;
    timestamp: string;
  }
  
  export interface NotificationRepositoryInterface {
    create(notification: Notification): Promise<void>;
    getAll(userId: string): Promise<Notification[]>;
    deleteAllOfUserId(userId: string): Promise<void>
    deleteId(id: string): Promise<void>
  }