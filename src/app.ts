import Fastify from 'fastify';
import userRoute from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

const server = Fastify();

async function main () {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoute, { prefix: 'api/users' });
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });

    console.log('Server ready at http://localhost:3000');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();