import { redis } from '@/lib/redis';
import { Queue } from 'bullmq';

export const notificationQueue = new Queue('notifications', {
  connection: redis,
});
