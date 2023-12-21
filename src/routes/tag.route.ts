import { FastifyInstance } from 'fastify';
import { findTagHandler } from '../controllers/tag.controller';
import { $ref } from '../schemas/tag.schema';
const tagRoute = async (server: FastifyInstance) => {
  server.post('/find', {
    schema: {
      body: $ref('createTagSchema'),
      response: {
        200: $ref('createTagResponseSchema'),
      },
    },
  }, findTagHandler);
};

export default tagRoute;