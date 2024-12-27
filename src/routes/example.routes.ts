import { FastifyInstance, FastifyRequest } from 'fastify';
import { db } from '../db';
import { exampleTable } from '../db/schema';

export async function exampleRoutes(fastify: FastifyInstance) {
  const baseUrl = '/api/examples';

  fastify.get(baseUrl, async () => {
    return { hello: 'world 2' };
  });

  fastify.post(baseUrl, async (request: FastifyRequest) => {
    const name = (request.body as { name: string }).name;

    const result = await db
      .insert(exampleTable)
      .values({
        name,
      })
      .returning({ insertedId: exampleTable.id });

    return result[0];
  });
}
