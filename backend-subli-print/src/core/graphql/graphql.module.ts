import { Module } from '@nestjs/common';
import { join } from 'node:path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): ApolloDriverConfig => {
        return {
          introspection: true,
          graphiql: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          formatError: (error: GraphQLError): GraphQLFormattedError => {
            if ('formattedError' in error.extensions) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { stacktrace, code, ...formattedError } = error.extensions;
              return {
                message: error.message,
                extensions: formattedError,
              };
            }
            return {
              message: error.message,
              extensions: error.extensions,
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
