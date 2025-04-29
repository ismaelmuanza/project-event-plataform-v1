import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { NotificationRepository } from '@/repositories/notifications-repository';
import { DeleteNotificationByIdUseCase } from '@/use-cases/notifications/delete-notification-by-id-use-case';

export async function deleteNotificationsByIdController(request: FastifyRequest, reply: FastifyReply) {
 
    try {

        const DeleteNotificationsByIdSchemaParams = z.object({
            id: z.string(),
        });
    
        const { id } = DeleteNotificationsByIdSchemaParams.parse(request.params);
        
        const notificationsRepository = new NotificationRepository();
        const deleteNotificationsByIdUseCase = new DeleteNotificationByIdUseCase(notificationsRepository);

        await deleteNotificationsByIdUseCase.execute(id);

        return reply.status(200).send({message: 'Notificação deletada com sucesso.'});

    } catch (err) {

        if (err instanceof Error) {
            return reply.status(404).send({ message: err.message });
        }

        throw err
    }
}