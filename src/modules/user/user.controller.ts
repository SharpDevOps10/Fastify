import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser, findUserByEmail } from './user.service';
import { CreateUseInput, LoginInput } from './user.schema';
import { verifyPassword } from '../../utils/hash';
import { server } from '../../app';

export async function registerUserHandler (
  request: FastifyRequest<{ Body: CreateUseInput }>,
  reply: FastifyReply,
) {
  const body = request.body;

  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (e) {
    console.error(e);
    return reply.code(500).send(e);
  }
}

export async function loginHandler (
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply,
) {
  const body = request.body;

  const user = await findUserByEmail(body.email);
  if (!user) return reply.code(401).send({ message: 'Invalid email/password' });

  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });
  if (correctPassword) {
    const { ...rest } = user;
    return { accessToken: server.jwt.sign(rest) };
  }

  return reply.code(401).send({ message: 'Invalid email/password' });
}