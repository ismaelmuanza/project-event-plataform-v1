
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getUserByEmailController } from '../../controllers/users/get-user-by-email-controller';

export const getUserByEmailRoutes: FastifyPluginAsyncZod = async (app) => {

       app.get('/users/email/:email', {
           schema: {
               tags: ['Users'],
               summary: 'Get user by Email',
               description: 'Returns a user by their ID.',
               params: z.object({
                   email: z.string().email(),
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
       }, getUserByEmailController);
};