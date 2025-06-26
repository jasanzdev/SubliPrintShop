import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { JwtPayload } from 'src/modules/auth/interfaces/interfaces';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req: Request & { user: JwtPayload } }>()
      .req;
    return request.user;
  },
);
