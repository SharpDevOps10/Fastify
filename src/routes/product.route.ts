import { FastifyInstance } from 'fastify';
import {
  createProductHandler,
  deleteProductHandler,
  getProductsHandler,
  updateProductHandler,
} from '../controllers/product.controller';
import { $ref } from '../schemas/product.schema';

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
    preHandler: [server.authenticate],
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

  server.delete('/:productId', {
    preHandler: [server.authenticate],
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
  }, deleteProductHandler);
};

export default productRoute;