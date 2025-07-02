import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    MongooseModule.forRoot(envs.mongoUrl, {
      dbName: envs.nodeEnv === 'test' ? 'print-studio-test' : 'print-studio',
      authSource: 'admin',
    }),
  ],
  providers: [],
  exports: [MongodbModule],
})
export class MongodbModule {}
