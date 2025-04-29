import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { NotificationRepository } from '@/repositories/notifications-repository';
import { GetNotificationsUseCase } from '@/use-cases/notifications/get-notifications-use-case';

export async function getNotificationsByIdController(request: FastifyRequest, reply: FastifyReply) {
 
    try {

        const GetNotificationsByIdSchemaParams = z.object({
            userId: z.string(),
        });
    
        const { userId } = GetNotificationsByIdSchemaParams.parse(request.params);
        
        const notificationsRepository = new NotificationRepository();
        const getNotificationsUseCase = new GetNotificationsUseCase(notificationsRepository);

        const notifications = await getNotificationsUseCase.execute(userId);

        return reply.status(200).send({notifications});

    } catch (err) {

        if (err instanceof Error) {
            return reply.status(404).send({ message: err.message });
        }

        throw err
    }
}