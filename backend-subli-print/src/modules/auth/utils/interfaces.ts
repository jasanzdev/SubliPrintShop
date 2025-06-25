import { Role } from 'src/common/enums/roles';

export interface JwtPayload {
  id: string;
  email: string;
  role: Role;
}
