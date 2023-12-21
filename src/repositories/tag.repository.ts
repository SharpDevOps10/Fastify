import prisma from '../utils/prisma';
import { CreateTagInput } from '../schemas/tag.schema';

export const tagRepository = {
  findTag: async (data: CreateTagInput) => {
    return prisma.tag.findFirst({
      where: {
        name: data.name,
        category: data.category,
      },
    });
  },

  createTag: async (data: CreateTagInput) => {
    return prisma.tag.create({ data });
  },
};

