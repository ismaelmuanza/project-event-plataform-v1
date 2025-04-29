import {fastify} from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { registerUserRoutes } from './http/routes/users/register-user.routes';
import { createEventRoutes } from "./http/routes/events/create-event.routes";
import { authenticateRoutes } from "./http/routes/authentications/authenticate-user.routes";
import { getUsersRoutes } from "./http/routes/users/get-users.routes";
import { getUserByIdRoutes } from "./http/routes/users/get-user-by-id.routes";
import { getUserByEmailRoutes } from "./http/routes/users/get-user-by-email.routes";
import { getEventsByParticipantRoutes } from "./http/routes/events/get-events-by-participant.routes";
import { getEventByIdRoutes } from "./http/routes/events/get-event-by-id.routes";
import { getEventsByCreaterRoutes } from "./http/routes/events/get-event-by-creater.routes";
import { getEventsRoutes } from "./http/routes/events/get-events.routes";
import { getParticipantByIdRoutes } from "./http/routes/participants/get-participant-by-id.routes";
import { getParticipantByEmailRoutes } from "./http/routes/participants/get-participant-by-email.routes";
import { getParticipantByIdAndEventIdRoutes } from "./http/routes/participants/get-participant-by-id-and-event-id.routes";
import { getParticipantsRoutes } from "./http/routes/participants/get-participants.routes";
import { getParticipantsByEventRoutes } from "./http/routes/participants/get-participants-by-event.routes";
import { registerParticipantRoutes } from "./http/routes/participants/register-participant.routes";
import { getTotalParticipantsRoutes } from "./http/routes/participants/get-total-participants.routes";
import { getTotalParticipantsByEventIdRoutes } from "./http/routes/participants/get-total-participants-by-event-id.routes";
import { getNotificationsByIdRoutes } from "./http/routes/notifications/get-notifications-by-id.routes";
import { deleteNotificationsByUserIdRoutes } from "./http/routes/notifications/delete-notifications-by-user-id.routes";
import { deleteNotificationByIdRoutes } from "./http/routes/notifications/delete-notification-by-id.routes";

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)


app.register(fastifyJwt, {
    secret: 'your-secret-key', // Substitua por uma variável de ambiente em produção
});

app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'System API Documentation',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });
  
  

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

// app.register(fastifySwagger, {
//     openapi: {
//         info: {
//             title: 'System API Documentation',
//             version: '1.0.0',
//         },
        
//     },
       
//     transform: jsonSchemaTransform,
// });

// app.register(fastifySwaggerUi, {
//     routePrefix: '/docs',
    
// });

// routes
// user
app.register(getUserByEmailRoutes);
app.register(registerUserRoutes);
app.register(getUsersRoutes);
app.register(getUserByIdRoutes);


app.register(authenticateRoutes);

// events
app.register(createEventRoutes);
app.register(getEventByIdRoutes);
app.register(getEventsByCreaterRoutes);
app.register(getEventsRoutes);
app.register(getEventsByParticipantRoutes);

// participants

app.register(getParticipantsRoutes);
app.register(getParticipantByIdRoutes)
app.register(getParticipantByEmailRoutes)
app.register(getParticipantByIdAndEventIdRoutes)
app.register(getParticipantsByEventRoutes)
app.register(getTotalParticipantsRoutes)
app.register(registerParticipantRoutes)
app.register(getTotalParticipantsByEventIdRoutes)

// notifications

app.register(getNotificationsByIdRoutes)
app.register(deleteNotificationsByUserIdRoutes)
// app.register(deleteNotificationByIdRoutes)


// app.setErrorHandler((err, _, reply) => {
  
//         if(err instanceof ZodError) {
//             return reply.status(400).send({message: err.message, issues: err.format()})
//         } 

//         // if(env.NODE_ENV !== 'production') {
//         //     console.error(err)
//         // }

//         return reply.status(500).send({message: 'Internal server error.'})
// })