import prisma from '../../utils/prisma';
import { CreateUseInput } from './user.schema';
import { hashPassword } from '../../utils/hash';

export async function createUser (input: CreateUseInput) {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  return prisma.user.create({
    data: { ...rest, salt, password: hash },
  });
}

export async function findUserByEmail (email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}