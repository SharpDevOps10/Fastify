import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser } from './user.service';
import { CreateUseInput } from './user.schema';

export async function registerUserHandler (
  request: FastifyRequest<{ Body: CreateUseInput }>,
  reply: FastifyReply
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