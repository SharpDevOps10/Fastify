import { FastifyInstance } from 'fastify';
import { createProductHandler, getProductsHandler, updateProductHandler } from './product.controller';
import { $ref } from './product.schema';

const productRoute = async (server: FastifyInstance) => {
  server.post('/', {
    preHandler: [server.authenticate],
    schema: {
      body: $ref('createProductSchema'),
      response: {
        201: $ref('productResponseSchema'),
      },
    },
  }, createProductHandler);

  server.get('/', {
    schema: {
      response: {
        200: $ref('productsResponseSchema'),
      },
    },
  }, getProductsHandler);

  server.patch('/:productId', {
    schema: {
      params: {
        type: 'object',
        properties: {
          productId: { type: 'number' },
        },
      },
      response: {
        200: $ref('productResponseSchema'),
      },
    },
  }, updateProductHandler);
};

export default productRoute;