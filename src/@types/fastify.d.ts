import "@fastify/jwt"

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string,
    } // user type is return type of `request.user` object
  }
}


// import 'fastify';

// declare module 'fastify' {
//   export interface FastifyRequest {
//       user: {
//         sub: string;
//       };
//   }
// }