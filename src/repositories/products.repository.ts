import prisma from '../utils/prisma';
import { CreateProductInput, UpdateProductInput } from '../schemas/product.schema';

export const productRepository = {
  createProduct: async (data: CreateProductInput & { ownerId: number }) => {
    return prisma.product.create({ data });
  },

  getProducts: async () => {
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
  },

  updateProduct: async (productId: number, data: UpdateProductInput) => {
    return prisma.product.update({
      where: { id: productId },
      data,
    });
  },

  deleteProduct: async (productId: number) => {
    return prisma.product.delete({
      where: { id: productId },
    });
  },
};