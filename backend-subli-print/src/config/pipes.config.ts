import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const validationGlobalPipes = new ValidationPipe({
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
});
