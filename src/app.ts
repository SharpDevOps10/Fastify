import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import userRoute from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import { productSchemas } from './modules/products/product.schema';
import productRoute from './modules/products/product.route';

export const server = Fastify();

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}


declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

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

const main = async () => {
  for (const schema of [ ...userSchemas, ...productSchemas ]) {
    server.addSchema(schema);
  }

  server.register(userRoute, { prefix: 'api/users' });
  server.register(productRoute, { prefix: 'api/products' });

  try {
    const port = Number(process.env.PORT);
    await server.listen({ port, host: '0.0.0.0' });

    console.log(`Server ready at http://localhost:${port}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();