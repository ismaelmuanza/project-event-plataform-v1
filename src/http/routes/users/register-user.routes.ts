import { registerUserController } from '../../controllers/users/register-user-controller';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const registerUserRoutes: FastifyPluginAsyncZod = async (app) => {
    app.post('/users', {
        schema: {
            tags: ['Users'],
            summary: 'Register a new user',
            description: 'Registers a new user in the system.',
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string().min(6, 'A palavra-passe deve ter pelo menos 6 caracteres'),
            }),
            response: {
                201: z.object({
                    user: z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string(),
                    }),
                }),
                409: z.object({
                    message: z.string(),
                }),
            },
        },
    }, registerUserController);
};