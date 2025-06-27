import { UserPlainObject } from 'src/common/interfaces/user.interface';
import { User } from 'src/modules/users/schemas/user.schema';

export const mockUser = {
  _id: '123',
  name: 'test',
  username: 'testing',
  email: 'test@example.com',
  password: 'hashed',
  role: 'CLIENT',
  provider: 'local',
  toObject: () => ({
    _id: '123',
    name: 'test',
    username: 'testing',
    email: 'test@example.com',
    role: 'CLIENT',
    provider: 'local',
  }),
} as User;

export const mockUserWithoutPass = {
  _id: '123',
  name: 'test',
  username: 'testing',
  email: 'test@example.com',
  role: 'CLIENT',
  provider: 'local',
} as UserPlainObject;

export const mockUserGoogleProfile = {
  _id: '123',
  googleId: 'google-id',
  name: 'test',
  username: 'testing',
  email: 'test@example.com',
  role: 'CLIENT',
  provider: 'google',
  toObject: () => ({
    _id: '123',
    name: 'test',
    username: 'testing',
    email: 'test@example.com',
    role: 'CLIENT',
    provider: 'google',
  }),
} as User;
