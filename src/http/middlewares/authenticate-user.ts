import { FastifyReply, FastifyRequest } from "fastify";

export const JWTSecret = 'jhdjhahhkankjskajskjasa';

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        // Verifica o token JWT e adiciona o payload ao objeto request
        await request.jwtVerify();

        // O Fastify-JWT já adiciona o payload ao request.user
        if (!request.user || !request.user.sub) {
            return reply.status(401).send({ message: 'Invalid Token Payload' });
        }

        // Opcional: Logar o ID do usuário autenticado
        // console.log(`Authenticated user ID: ${request.user.sub}`);
    } catch (err) {
        return reply.status(401).send({ message: 'Invalid Token' });
    }
}   