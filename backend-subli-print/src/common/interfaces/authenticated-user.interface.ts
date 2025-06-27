import { Request } from 'express';
import { UserPlainObject } from 'src/common/interfaces/user.interface';

export interface AuthenticatedRequest extends Request {
  user: UserPlainObject;
}
