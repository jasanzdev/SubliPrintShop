import { AuthProvider } from 'src/common/constants/auth-provider';
import { Role } from 'src/common/constants/roles.';

export interface UserPlainObject {
  _id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  role: Role;
  googleId?: string;
  avatar?: string;
  provider: AuthProvider;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GoogleProfile {
  googleId: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  role?: Role;
  provider: 'google';
}
