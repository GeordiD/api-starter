import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { UserSchema } from '../db/schema';
import passport from '@fastify/passport';

export async function authRoutes(fastify: FastifyInstance) {
  const url = '/api/auth';

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: `${url}/login`,
    schema: {
      body: UserSchema,
    },
    preValidation: passport.authenticate('login', {
      successRedirect: '/',
      failureRedirect: '/login?failed=true',
      authInfo: false,
    }),
    handler: (req, reply) => {
      reply.send({
        message: 'Success',
        user: req.body,
      });
    },
  });
}
