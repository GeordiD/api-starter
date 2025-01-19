import fastifyPassport from '@fastify/passport';
import fastifySecureSession from '@fastify/secure-session';
import { FastifyInstance } from 'fastify';
import { Strategy as LocalStrategy } from 'passport-local';
import { db } from '../db/client';
import { FullUser, User, users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

const cleanUser = (fullUser: FullUser) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordSalt, ...cleanUser } = fullUser;
  return cleanUser;
};

export function setupAuth(server: FastifyInstance) {
  // set up secure sessions for @fastify/passport to store data in
  server.register(fastifySecureSession, {
    key: process.env.SESSION_SECRET ?? '',
  });
  // initialize @fastify/passport and connect it to the secure-session storage. Note: both of these plugins are mandatory.
  server.register(fastifyPassport.initialize());
  server.register(fastifyPassport.secureSession());

  fastifyPassport.use(
    'login',
    new LocalStrategy(async function (email, password, done) {
      try {
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user || !user.passwordSalt) {
          done(null, false);
          return;
        }

        if (!(await bcrypt.compare(password, user.passwordSalt))) {
          done(null, false);
        }

        done(null, cleanUser(user) as User);
      } catch (err) {
        done(err);
      }
    })
  );
}
