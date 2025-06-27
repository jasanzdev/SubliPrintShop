import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  Logger,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { ErrorResponse } from '../interfaces/error-response.interface';
import { envs } from 'src/config/envs';
import { GraphQLError } from 'graphql';
import { GqlContext } from '../interfaces/context.interface';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctxType = host.getType();

    if (ctxType === 'http') {
      return this.handleHttpException(exception, host);
    }

    return this.handleGraphQLException(exception, host);
  }

  private handleHttpException(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { statusCode, message } = this.extractStatusAndMessage(exception);

    const errorPayload: ErrorResponse = {
      statusCode,
      error: typeof message === 'string' ? message : undefined,
      message,
    };

    if (envs.nodeEnv !== 'test') {
      this.logger.error(
        `[HTTP] ${request.method} ${request.url} → ${JSON.stringify(errorPayload)}`,
      );
    }

    response.status(statusCode).json({
      ...errorPayload,
      path: request.url,
      method: request.method,
    });
  }

  private handleGraphQLException(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext<GqlContext>();
    const request = ctx.req;

    const { statusCode, message } = this.extractStatusAndMessage(exception);
    const errorPayload: ErrorResponse = {
      statusCode,
      message,
      error: typeof message === 'string' ? message : undefined,
    };

    if (envs.nodeEnv !== 'test') {
      this.logger.error(
        `[GraphQL] ${request?.method || 'QUERY'} ${request?.url || ''} → ${JSON.stringify(
          errorPayload,
        )}`,
      );
    }

    throw new GraphQLError('Exception Error', {
      extensions: {
        ...errorPayload,
      },
    });
  }

  private extractStatusAndMessage(exception: unknown): {
    statusCode: number;
    message: string | string[];
  } {
    if (exception instanceof BadRequestException) throw exception;

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();

      const response = exception.getResponse();

      const message =
        typeof response === 'string'
          ? response
          : ((response as { message?: unknown }).message ?? 'Unexpected error');

      return {
        statusCode,
        message:
          typeof message === 'string' || Array.isArray(message)
            ? message
            : 'Unexpected error',
      };
    }

    return exception instanceof Error
      ? {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: exception.message,
        }
      : {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        };
  }
}
