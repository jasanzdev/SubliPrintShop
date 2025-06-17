import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongodbModule } from './core/mongodb/mongodb.module';
import { GraphqlModule } from './core/graphql/graphql.module';
import { BadRequestExceptionFilter } from './common/filters/validation-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [AuthModule, UsersModule, MongodbModule, GraphqlModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
  ],
})
export class AppModule {}
