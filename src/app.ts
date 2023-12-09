import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import userRoute from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

export const server = Fastify();

server.register(fastifyJwt, {
  secret: process.env.SECRET as string,
});

server.decorate(
  'auth',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  }
);

async function main () {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoute, { prefix: 'api/users' });
  try {
    const port = Number(process.env.PORT);
    await server.listen({ port, host: '0.0.0.0' });

    console.log(`Server ready at http://localhost:${port}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();