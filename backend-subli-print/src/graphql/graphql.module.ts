import { Module } from '@nestjs/common';
import { join } from 'node:path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { envs } from 'src/config/envs';
import { GqlContext } from 'src/common/interfaces/context.interface';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): ApolloDriverConfig => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          includeStacktraceInErrorResponses: envs.nodeEnv === 'development',
          graphiql: true,
          csrfPrevention: envs.nodeEnv === 'production',
          introspection: envs.nodeEnv === 'development',
          cache: 'bounded',
          persistedQueries:
            envs.nodeEnv === 'production' ? { ttl: 3600 } : false,
          context: ({ req, res }: GqlContext) => {
            if (res && !res.header) {
              res.header = () => res;
            }

            req.headers = req.headers || {};
            req.headers['x-forwarded-for'] =
              req.headers['x-forwarded-for'] || req.socket?.remoteAddress;

            return { req, res };
          },
          formatError: (error: GraphQLError): GraphQLFormattedError => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { stacktrace, code, ...formattedError } = error.extensions;
            return {
              message: error.message,
              extensions: formattedError,
            };
          },
        };
      },
    }),
  ],
  providers: [],
  exports: [GraphqlModule],
})
export class GraphqlModule {}
