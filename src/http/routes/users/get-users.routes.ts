import { getUsersController } from '../../controllers/users/get-users-controller';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const getUsersRoutes: FastifyPluginAsyncZod = async (app) => {
    app.get('/users', {
        schema: {
            tags: ['Users'],
            summary: 'Get all users',
            description: 'Returns a list of all users.',
            response: {
                200: z.object({
                    users: z.array(z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string(),
                    })),
                }),
            },
        },
    }, getUsersController);
};