import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from 'src/core/config/envs';

@Module({
  imports: [
    MongooseModule.forRoot(envs.mongoUrl, {
      dbName: 'print-studio',
      authSource: 'admin',
    }),
  ],
  providers: [],
  exports: [MongodbModule],
})
export class MongodbModule {}
