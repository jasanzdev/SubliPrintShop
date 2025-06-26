import { JwtPayload } from 'src/modules/auth/interfaces/interfaces';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
