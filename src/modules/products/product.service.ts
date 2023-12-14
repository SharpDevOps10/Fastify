import { CreateProductInput } from './product.schema';
import prisma from '../../utils/prisma';

export const createProduct = async (data: CreateProductInput & { ownerId: number }) => {
  return prisma.product.create({ data });
};