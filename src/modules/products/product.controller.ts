import { FastifyRequest } from 'fastify';
import { CreateProductInput } from './product.schema';
import { createProduct } from './product.service';

export const createProductHandler = async (request: FastifyRequest<{ Body: CreateProductInput }>) => {
  return await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });
};