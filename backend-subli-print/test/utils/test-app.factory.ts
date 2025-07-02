import { Injectable, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { mockUserGoogleProfile } from './constants';

@Injectable()
export class MockGoogleAuthGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    req.user = mockUserGoogleProfile;
    return true;
  }
}
