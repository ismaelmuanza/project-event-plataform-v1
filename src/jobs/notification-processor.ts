// notification-worker.ts
import { Worker } from 'bullmq'
import { CreateNotificationUseCase } from '@/use-cases/notifications/create-notification-use-case'
import { NotificationRepository } from '@/repositories/notifications-repository'
import { redis } from '@/lib/redis'
import { notificationQueue } from './notification-queue'

new Worker('notifications', async (job) => {
  const { userId, message, type } = job.data

  const notificationRepository = new NotificationRepository()
  const useCase = new CreateNotificationUseCase(notificationRepository)

  await useCase.execute({ userId, message, type })

  // Persistir no Redis (opcional, caso o use case não faça isso)
  const key = `user:${userId}:notifications`
  await redis.lpush(key, JSON.stringify({ userId, message, type }))
  await redis.expire(key, 86400)

  console.log(`✅ Notificação executada para ${userId}`)
}, {
  connection: redis,
})
