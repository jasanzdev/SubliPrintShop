import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { UserPlainObject } from '../interfaces/user.interface';

export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserPlainObject => {
    const ctxType = context.getType();
    if (ctxType === 'http') {
      const req = context.switchToHttp().getRequest<Request>();
      return req.user as UserPlainObject;
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<{
      req: Request & { user: UserPlainObject };
    }>().req;
    return req.user;
  },
);
