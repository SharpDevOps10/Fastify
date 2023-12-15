import { CreateProductInput, UpdateProductInput } from './product.schema';
import prisma from '../../utils/prisma';

export const createProduct = async (data: CreateProductInput & { ownerId: number }) => {
  return prisma.product.create({ data });
};

export const getProducts = async () => {
  return prisma.product.findMany({
    select: {
      content: true,
      title: true,
      price: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
};

export const updateProduct = async (productId: number, data: UpdateProductInput) => {
  return prisma.product.update({
    where: {
      id: productId,
    },
    data,
  });
};