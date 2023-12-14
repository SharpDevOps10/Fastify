import { FastifyInstance } from 'fastify';
import { getUsersHandler, loginHandler, registerUserHandler } from './user.controller';
import { $ref } from './user.schema';

const userRoute = async (server: FastifyInstance) => {
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

  server.get('/', {
    preHandler: [server.authenticate],
  }, getUsersHandler);
};

export default userRoute;