import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request, Response } from 'express';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(
    this: void,
    context: ExecutionContext,
  ): {
    req: Request;
    res: Response;
  } {
    try {
      const httpContext = context.switchToHttp();
      const httpReq = httpContext.getRequest<Request>();
      const httpRes = httpContext.getResponse<Response>();

      if (httpReq && httpRes) {
        return { req: httpReq, res: httpRes };
      }
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext<{ req: Request; res: Response }>();

      if (!ctx?.req || !ctx?.res) {
        throw new Error('Missing request or response in context');
      }

      ctx.req.headers ||= {};

      return { req: ctx.req, res: ctx.res };
    } catch (error) {
      console.error('Error in GqlThrottlerGuard:', error);
      throw new Error('Could not initialize throttler context');
    }
  }
  public async canActivate(
    this: void,
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      return await super.canActivate(context);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('header')) {
        return true;
      }
      throw error;
    }
  }
}
