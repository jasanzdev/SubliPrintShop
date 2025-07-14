import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { AppModule } from 'src/app.module';
import { validationGlobalPipes } from 'src/config/pipes.config';
import { helmetMiddleware } from 'src/config/helmet.config';
import { csrf } from 'src/config/csrf.config';
import { sessionMiddleware } from 'src/common/middlewares/session.middleware';
import { corsOptions } from 'src/config/cors.config';
import { MockGoogleAuthGuard } from './test-app.factory';

interface AppProps {
  useCsrf?: boolean;
  mongoUri: string;
}

export async function createTestApp({ useCsrf, mongoUri }: AppProps): Promise<{
  app: NestExpressApplication;
  moduleRef: TestingModule;
}> {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule.register(mongoUri)],
  })
    .overrideGuard(AuthGuard('google'))
    .useClass(MockGoogleAuthGuard)
    .compile();

  const app = moduleRef.createNestApplication<NestExpressApplication>();
  app.setGlobalPrefix('api/sps1');
  app.useGlobalPipes(validationGlobalPipes);
  app.use(helmetMiddleware);
  app.use(cookieParser());
  if (useCsrf) app.use(csrf.doubleCsrfProtection);
  app.use(sessionMiddleware);

  app.enableCors(corsOptions);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  await app.init();
  return { app, moduleRef };
}
