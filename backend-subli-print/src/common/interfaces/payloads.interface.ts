import { UserPlainObject } from 'src/common/interfaces/user.interface';

export interface AccessPayload extends Pick<UserPlainObject, 'email' | 'role'> {
  sub: UserPlainObject['_id'];
}

export interface RefreshPayload {
  email: UserPlainObject['email'];
}
