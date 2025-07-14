import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, minutes, seconds } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { GraphqlModule } from './graphql/graphql.module';
import { BadRequestExceptionFilter } from './common/filters/validation-exception.filter';
import { GqlThrottlerGuard } from './common/guards/gql-throttler.guard';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { CsrfController } from './csrf/csrf.controller';
import { envs } from './config/envs';

@Module({})
export class AppModule {
  static register(mongoUri: string): DynamicModule {
    return {
      module: AppModule,
      imports: [
        AuthModule,
        UsersModule,
        MongodbModule.forRoot(mongoUri),
        GraphqlModule,
        ThrottlerModule.forRoot({
          throttlers: [
            {
              name: 'short',
              ttl: seconds(4),
              limit: 3,
              blockDuration: minutes(5),
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
      controllers: [CsrfController],
      providers: [
        {
          provide: APP_FILTER,
          useClass: AllExceptionFilter,
        },
        {
          provide: APP_FILTER,
          useClass: BadRequestExceptionFilter,
        },
        {
          provide: APP_GUARD,
          useClass: GqlThrottlerGuard,
        },
      ],
    };
  }
}
