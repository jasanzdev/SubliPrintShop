import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'src/app.module';
import * as cookieParser from 'cookie-parser';

import { csrf } from 'src/bootstrap/csrf.config';
import { json, urlencoded } from 'express';
import { sessionMiddleware } from 'src/bootstrap/session.middleware';
import { helmetMiddleware } from 'src/bootstrap/helmet.config';
import { corsOptions } from 'src/bootstrap/cors.config';

export async function createTestApp(): Promise<NestExpressApplication> {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication<NestExpressApplication>();
  app.setGlobalPrefix('api/sps1');
  app.use(helmetMiddleware);
  app.use(cookieParser());

  app.use(sessionMiddleware);
  app.use(csrf.doubleCsrfProtection);

  app.enableCors(corsOptions);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  await app.init();
  return app;
}
