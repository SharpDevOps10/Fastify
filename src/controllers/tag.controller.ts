import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTagInput } from '../schemas/tag.schema';
import { findTag } from '../services/tag.service';

export const findTagHandler = async (request: FastifyRequest<{ Body: CreateTagInput }>, reply: FastifyReply) => {
  try {
    const tag = await findTag(request.body);

    if (tag) reply.send(tag);
    else reply.code(404).send('Tag not found');
  } catch (error) {
    console.error('Error finding tag:', error);
    reply.code(500).send('Internal Server Error');
  }
};