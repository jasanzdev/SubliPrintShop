import { UserPlainObject } from 'src/modules/users/interfaces/user.interface';

export interface JwtPayload extends Pick<UserPlainObject, 'username' | 'role'> {
  sub: UserPlainObject['_id'];
}
