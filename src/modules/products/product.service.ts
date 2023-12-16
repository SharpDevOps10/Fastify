import { CreateProductInput, UpdateProductInput } from './product.schema';
import { productRepository } from './products.repository';

export const createProduct = async (data: CreateProductInput & { ownerId: number }) => {
  return productRepository.createProduct(data);
};

export const getProducts = async () => {
  return productRepository.getProducts();
};

export const updateProduct = async (productId: number, data: UpdateProductInput) => {
  return productRepository.updateProduct(productId, data);
};

export const deleteProduct = async (productId: number) => {
  return productRepository.deleteProduct(productId);
};