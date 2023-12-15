import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateProductInput, UpdateProductInput } from './product.schema';
import { createProduct, getProducts, updateProduct } from './product.service';

export const createProductHandler = async (request: FastifyRequest<{ Body: CreateProductInput }>) => {
  return await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });
};

export const getProductsHandler = async () => {
  return getProducts();
};

export const updateProductHandler = async (
  request: FastifyRequest<{ Params: { productId: string }; Body: UpdateProductInput }>,
  reply: FastifyReply,
) => {
  try {
    const productId = parseInt(request.params.productId, 10);
    const data: UpdateProductInput = request.body;

    const updatedProduct = await updateProduct(productId, data);

    reply.code(200).send(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    reply.code(500).send('Internal Server Error');
  }
};