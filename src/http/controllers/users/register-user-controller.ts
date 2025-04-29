import { FastifyReply, FastifyRequest } from 'fastify';
import { z, ZodError } from 'zod';
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case';

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerUserSchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
        });

        const { name, email, password } = registerUserSchema.parse(request.body);

        const registerUserUseCase = makeRegisterUserUseCase();

        const user = await registerUserUseCase.execute({ name, email, password });

        return reply.status(201).send({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        if (err instanceof Error) {
            return reply.status(409).send({ message: err.message });
        }

        throw err;
    }
}