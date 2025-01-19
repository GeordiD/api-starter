import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../db/client';
import { users } from '../db/schema';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

async function saltPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function accountRoutes(fastify: FastifyInstance) {
  const url = '/api/account';

  fastify.withTypeProvider<ZodTypeProvider>().route({
    url,
    method: 'POST',
    schema: {
      body: z.object({
        email: z.string().min(8),
        password: z.string().min(8),
      }),
    },
    handler: async (req, reply) => {
      // See if a user already exists with that username
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, req.body.email),
      });

      if (existingUser) {
        reply.code(409).send({
          message: 'Email already exists, try logging in.',
        });
        return;
      }

      await db.insert(users).values({
        email: req.body.email,
        passwordSalt: await saltPassword(req.body.password),
      });
    },
  });
}
