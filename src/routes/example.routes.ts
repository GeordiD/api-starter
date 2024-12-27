import { FastifyInstance } from 'fastify';

export async function exampleRoutes(fastify: FastifyInstance) {
  fastify.get('/api/examples', async () => {
    return { hello: 'world 2' };
  });
}
