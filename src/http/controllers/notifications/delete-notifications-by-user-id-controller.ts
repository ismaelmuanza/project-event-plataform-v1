import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { NotificationRepository } from '@/repositories/notifications-repository';
import { DeleteNotificationsByUserIdUseCase } from '@/use-cases/notifications/delete-notifications-by-user-id-use-case';

export async function deleteNotificationsByUserIdController(request: FastifyRequest, reply: FastifyReply) {
 
    try {

        const DeleteNotificationsByUserIdSchemaParams = z.object({
            userId: z.string(),
        });
    
        const { userId } = DeleteNotificationsByUserIdSchemaParams.parse(request.params);
        
        const notificationsRepository = new NotificationRepository();
        const deleteNotificationsByUserIdUseCase = new DeleteNotificationsByUserIdUseCase(notificationsRepository);

        await deleteNotificationsByUserIdUseCase.execute(userId);

        return reply.status(200).send({message: 'Notificações deletadas com sucesso.'});

    } catch (err) {

        if (err instanceof Error) {
            return reply.status(404).send({ message: err.message });
        }

        throw err
    }
}