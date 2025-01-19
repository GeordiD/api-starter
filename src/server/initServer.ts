import Fastify from 'fastify';
import { exampleRoutes } from '../routes/example.routes';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { authRoutes } from '../routes/auth.routes';
import { accountRoutes } from '../routes/account.routes';

const app = Fastify({
  logger: true,
});

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Register Routes
app.register(exampleRoutes);
app.register(authRoutes);
app.register(accountRoutes);

export const initServer = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
