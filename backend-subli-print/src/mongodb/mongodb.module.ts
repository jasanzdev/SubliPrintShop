import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class MongodbModule {
  static forRoot(mongoUri: string): DynamicModule {
    return {
      module: MongodbModule,
      imports: [MongooseModule.forRoot(mongoUri)],
      exports: [MongooseModule],
    };
  }
}
