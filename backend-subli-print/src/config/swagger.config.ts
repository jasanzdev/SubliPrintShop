import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Api SubliPrintShop')
  .setDescription('The SubliPrintShop API')
  .setVersion('1.0')
  .addTag('subli-print')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
    name: 'Authorization',
    description: 'Enter your bearer token',
  })
  .addSecurityRequirements('bearer')
  .build();
