
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getUserByIdController } from '../../controllers/users/get-user-by-id-controller';

export const getUserByIdRoutes: FastifyPluginAsyncZod = async (app) => {
       app.get('/users/:id', {
           schema: {
               tags: ['Users'],
               summary: 'Get user by ID',
               description: 'Returns a user by their ID.',
               params: z.object({
                   id: z.string(),
               }),
               response: {
                   200: z.object({
                       user: z.object({
                           id: z.string(),
                           name: z.string(),
                           email: z.string(),
                       }),
                   }),
                   404: z.object({
                       message: z.string(),
                   }),
               },
           },
       }, getUserByIdController);
};