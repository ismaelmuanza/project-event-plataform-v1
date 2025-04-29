import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterParticipantUseCase } from '@/use-cases/factories/make-register-participant-use-case';

export async function registerParticipantController(request: FastifyRequest, reply: FastifyReply) {
    try {
       
        const registerParticipantSchemaBody = z.object({
            name: z.string(),
            email: z.string().email(),
        });
        const registerParticipantSchemaParams = z.object({
            eventId: z.string(),
        });

        const { name, email } = registerParticipantSchemaBody.parse(request.body);
        const { eventId } = registerParticipantSchemaParams.parse(request.params);

        const { user } = request; // Obtém o ID do usuário autenticado
        // console.log(user)

        const registerParticipantUseCase = makeRegisterParticipantUseCase();

        const participant = await registerParticipantUseCase.execute({ id: user.sub, event_id: eventId, name, email });

        return reply.status(201).send({
            participant: {
                id: participant.id,
                event_id: participant.event_id,
                name: participant.name,
                email: participant.email,
            },
        });
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(409).send({ message: err.message });
        }

        throw err;
    }
}