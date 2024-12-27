import { FastifyInstance } from 'fastify';
import { db } from '../db/client';
import { exampleTable } from '../db/schema';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export async function exampleRoutes(fastify: FastifyInstance) {
  const url = '/api/examples';

  fastify.get(url, async () => {
    return { hello: 'world 2' };
  });

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url,
    schema: {
      body: z.object({
        name: z.string().min(1),
      }),
      response: {
        200: z.object({
          insertedId: z.number(),
        }),
      },
    },
    handler: async (req) => {
      const result = await db
        .insert(exampleTable)
        .values({
          name: req.body.name,
        })
        .returning({ insertedId: exampleTable.id });

      return result[0];
    },
  });
}
