import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCreateEventUseCase } from '@/use-cases/factories/make-create-event-use-case';

export async function createEventController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const createEventSchema = z.object({
            title: z.string(),
            description: z.string(),
            date: z.string().refine((date) => !isNaN(Date.parse(date)), {
                message: 'Invalid date format',
            }),
            publishDate: z.coerce.date().optional(),
        });

        const { title, description, date, publishDate } = createEventSchema.parse(request.body);

        const {user} = request
        
        const createEventUseCase = makeCreateEventUseCase();

        const event = await createEventUseCase.execute({
            title,
            description,
            date: new Date(date),
            creater_event: user.sub,
            publishDate
        });

        return reply.status(201).send({
            event: {
                id: event.id,
                title: event.title,
                description: event.description,
                date: event.date.toISOString(), // Convertendo para string no formato ISO
                creater_event: event.creater_event,
            },
        });
    } catch (err) {

        if(err instanceof Error) {
            return reply.status(400).send({ message: err.message });
        } 

        throw err;
    }
}