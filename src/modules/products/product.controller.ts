import { FastifyRequest } from 'fastify';
import { CreateProductInput } from './product.schema';
import { createProduct, getProducts } from './product.service';

export const createProductHandler = async (request: FastifyRequest<{ Body: CreateProductInput }>) => {
  return await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });
};

export const getProductsHandler = async () => {
  return getProducts();
};