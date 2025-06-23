import {
  Catch,
  ExceptionFilter,
  BadRequestException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GraphQLError } from 'graphql';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctxType = host.getType();

    if (ctxType === 'http') {
      const httpContext = host.switchToHttp();
      const response = httpContext.getResponse<Response>();
      const request = httpContext.getRequest<Request>();

      const status = exception.getStatus();

      const responseBody = {
        statusCode: status,
        path: request.url,
        error: 'Bad Request',
        message: exception.getResponse(),
      };

      response.status(status).json(responseBody);
      return;
    }

    throw new GraphQLError('Validation Error', {
      extensions: {
        statusCode: exception.getStatus(),
        message: exception.getResponse(),
        error: 'Bad Request',
      },
    });
  }
}
