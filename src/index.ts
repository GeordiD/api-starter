import Fastify from 'fastify';
import { exampleRoutes } from './routes/example.routes';

const fastify = Fastify({
  logger: true,
});

fastify.register(exampleRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
