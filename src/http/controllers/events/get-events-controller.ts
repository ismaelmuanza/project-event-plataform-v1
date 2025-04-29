import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaEventRepository } from '@/repositories/prisma/prisma-event-repository';
import { GetEventsUseCase } from '@/use-cases/events/get-events-use-case';

export async function getEventsController(request: FastifyRequest, reply: FastifyReply) {
    
    try {

        const eventRepository = new PrismaEventRepository();
        const getEventsUseCase = new GetEventsUseCase(eventRepository);


        const events = await getEventsUseCase.execute();

        return reply.status(200).send({events});

    } catch (err) {

        throw err
    }
}