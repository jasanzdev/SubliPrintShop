import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          field: error.property,
          message: error.constraints
            ? Object.values(error.constraints)[0]
            : 'Validation error',
        }));
        return new BadRequestException(result);
      },
    }),
  );
  app.setGlobalPrefix('api/jasanz');
  await app.listen(envs.port);
  logger.log(`Application is running on: http://localhost:${envs.port}`);
}
void bootstrap();
