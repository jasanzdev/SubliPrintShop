import {
  Catch,
  ExceptionFilter,
  BadRequestException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GraphQLError } from 'graphql';
import { envs } from 'src/config/envs';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BadRequestExceptionFilter.name);
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctxType = host.getType();

    if (ctxType === 'http') {
      const httpContext = host.switchToHttp();
      const response = httpContext.getResponse<Response>();
      const request = httpContext.getRequest<Request>();

      const status = exception.getStatus();

      const responseBody = {
        statusCode: status,
        error: 'Bad Request',
        responseData: exception.getResponse(),
      };

      if (envs.nodeEnv !== 'test') {
        this.logger.error(
          `HTTP ${request.method} ${request.url} -> ${JSON.stringify(exception.getResponse())}`,
        );
      }

      response.status(status).json(responseBody);
      return;
    }
    if (envs.nodeEnv !== 'test') {
      this.logger.error(
        `GraphQL Error -> ${JSON.stringify(exception.getResponse())}`,
      );
    }
    throw new GraphQLError('Validation Error', {
      extensions: {
        statusCode: exception.getStatus(),
        responseData: exception.getResponse(),
        error: 'Bad Request',
      },
    });
  }
}
