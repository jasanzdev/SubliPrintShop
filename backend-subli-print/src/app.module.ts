import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { GraphqlModule } from './graphql/graphql.module';
import { BadRequestExceptionFilter } from './common/filters/validation-exception.filter';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { envs } from './config/envs';
import { GqlThrottlerGuard } from './common/guard/gql-throttler.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongodbModule,
    GraphqlModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: seconds(4),
          limit: 3,
        },
        {
          name: 'medium',
          ttl: seconds(30),
          limit: 10,
        },
        {
          name: 'long',
          ttl: seconds(80),
          limit: 25,
        },
      ],
      errorMessage: 'Wow, Slow down! You are making too many requests.',
      storage: new ThrottlerStorageRedisService(envs.redisUrl),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
