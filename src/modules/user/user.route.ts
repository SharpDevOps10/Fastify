import { FastifyInstance } from 'fastify';
import { loginHandler, registerUserHandler } from './user.controller';
import { $ref } from './user.schema';
async function userRoute (server: FastifyInstance) {
  server.post('/', {
    schema: {
      body: $ref('createUserSchema'),
      response: {
        201: $ref('createUserSchemaResponse'),
      },
    },
  }, registerUserHandler);

  server.post('/login', {
    schema: {
      body: $ref('loginSchema'),
      response: {
        200: $ref('loginResponseSchema'),
      },
    },
  }, loginHandler);
}

export default userRoute;