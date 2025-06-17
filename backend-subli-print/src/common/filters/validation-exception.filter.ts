import {
  Catch,
  ExceptionFilter,
  BadRequestException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { GraphQLError } from 'graphql';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctxType = host.getType();

    if (ctxType === 'http') {
      const httpContext = host.switchToHttp();
      const response = httpContext.getResponse<Response>();
      const status = exception.getStatus();

      const responseBody = this.getFormattedResponse(exception);

      response.status(status).json(responseBody);
      return;
    }

    const formattedError = this.getFormattedResponse(exception);

    throw new GraphQLError('Validation Error', {
      extensions: {
        formattedError,
      },
    });
  }

  private getFormattedResponse(exception: BadRequestException) {
    const response = exception.getResponse();
    let message: string[] = ['Bad Request'];

    if (typeof response === 'string') {
      message = [response];
    } else if (
      typeof response === 'object' &&
      response !== null &&
      'message' in response
    ) {
      const extracted = (response as { message?: unknown }).message;
      if (Array.isArray(extracted)) {
        message = extracted.map((msg) => String(msg));
      } else if (extracted) {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        message = [String(extracted)];
      }
    }

    return {
      statusCode: exception.getStatus(),
      error: 'Bad Request',
      message,
      timestamp: new Date().toISOString(),
    };
  }
}
