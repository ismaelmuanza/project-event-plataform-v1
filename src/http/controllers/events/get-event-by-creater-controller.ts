import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaEventRepository } from '@/repositories/prisma/prisma-event-repository';
import { GetEventsByCreaterEventUseCase } from '@/use-cases/events/get-events-by-creater-event-use-case';

export async function getEventsByCreaterController(request: FastifyRequest, reply: FastifyReply) {
    
    const getEventsByCreaterdSchemaParams = z.object({
        userId: z.string(),
    });

    const { userId } = getEventsByCreaterdSchemaParams.parse(request.params);

    try {

        const eventRepository = new PrismaEventRepository();
        const getEventsByCreaterUseCase = new GetEventsByCreaterEventUseCase(eventRepository);


        const events = await getEventsByCreaterUseCase.execute(userId);

        return reply.status(200).send({events});

    } catch (err) {

        if (err instanceof Error) {
            return reply.status(404).send({ message: err.message });
        }
        throw err
    }
}