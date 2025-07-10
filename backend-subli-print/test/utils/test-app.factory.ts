import { Injectable, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { mockSavedUserGoogle } from './constants';

@Injectable()
export class MockGoogleAuthGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    req.user = mockSavedUserGoogle;
    return true;
  }
}
