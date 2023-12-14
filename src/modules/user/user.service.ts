import prisma from '../../utils/prisma';
import { CreateUseInput } from './user.schema';
import { hashPassword } from '../../utils/hash';

export const createUser = async (input: CreateUseInput) => {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  return prisma.user.create({
    data: { ...rest, salt, password: hash },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUsers = async () => {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
};