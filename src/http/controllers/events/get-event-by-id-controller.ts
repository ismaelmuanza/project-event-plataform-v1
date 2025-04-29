import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaEventRepository } from '@/repositories/prisma/prisma-event-repository';
import { GetEventByIdUseCase } from '@/use-cases/events/get-event-by-id-use-case';

export async function getEventByIdController(request: FastifyRequest, reply: FastifyReply) {
    
    const getEventByIdSchemaParams = z.object({
        id: z.string(),
    });

    const { id } = getEventByIdSchemaParams.parse(request.params);

    try {

        const eventRepository = new PrismaEventRepository();
        const getEventByIdUseCase = new GetEventByIdUseCase(eventRepository);


        const event = await getEventByIdUseCase.execute(id);

        return reply.status(200).send({event});

    } catch (err) {

        if (err instanceof Error) {
            return reply.status(404).send({ message: err.message });
        }
        throw err
    }
}