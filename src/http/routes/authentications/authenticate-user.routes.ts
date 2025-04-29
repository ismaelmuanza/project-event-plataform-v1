import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { authenticateUserController } from '../../controllers/authenticate-user-controller';

export const JWTSECRET = 'jwtSecretjjehjy343k43k4'

export const authenticateRoutes: FastifyPluginAsyncZod = async (app) => {
    app.post('/sessions', {
        schema: {
            tags: ['Authentication'],
            summary: 'Authenticate a user',
            description: 'Authenticates a user and returns a JWT token.',
            body: z.object({
                email: z.string().email(),
                password: z.string().min(6),
            }),
            response: {
                200: z.object({
                    token: z.string(),
                }),
                401: z.object({
                    message: z.string(),
                }),
            },
        },
    }, authenticateUserController
)};