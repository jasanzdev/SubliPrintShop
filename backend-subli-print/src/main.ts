import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { json, NextFunction, Request, Response, urlencoded } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { envs } from './config/envs';
import { AppModule } from './app.module';
import { helmetMiddleware } from './bootstrap/helmet.config';
import { corsOptions } from './bootstrap/cors.config';
import { csrf } from './bootstrap/csrf.config';
import { validationGlobalPipes } from './bootstrap/pipes.config';
import { sessionMiddleware } from './bootstrap/session.middleware';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './bootstrap/swagger.config';

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/sps1');

  app.useGlobalPipes(validationGlobalPipes);

  app.use(helmetMiddleware);
  app.use(cookieParser());

  app.use(sessionMiddleware);
  // app.use(csrf.doubleCsrfProtection);

  app.enableCors(corsOptions);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  app.use((req: Request, res: Response, next: NextFunction): void => {
    req.headers = req.headers || {};
    next();
  });

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-doc', app, documentFactory);

  await app.listen(envs.port);
  logger.log(`Application is running on: http://localhost:${envs.port}`);
}
void bootstrap();
