import { Profile } from 'passport-google-oauth20';
import { UserPlainObject } from 'src/common/interfaces/user.interface';
import { RefreshToken } from 'src/modules/auth/schemas/refresh-token.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export const validOrigin = 'https://myfrontend.com';
export const invalidOrigin = 'https://another-site.com';
export const csrfRoute = '/api/sps1/csrf/csrf-token';
export const loginRoute = '/api/sps1/auth/login';

export const testUser = {
  name: 'test',
  username: 'testing',
  email: 'testing@example.com',
  password: 'Test1234!',
  role: 'CLIENT',
  provider: 'local',
};

export const validCredentials = {
  email: 'testing@example.com',
  password: 'Test1234!',
};

export const mockUser = {
  _id: '123',
  name: 'test',
  username: 'testing',
  email: 'testing@example.com',
  password: 'hashed',
  role: 'CLIENT',
  provider: 'local',
  toObject: () => ({
    _id: '123',
    name: 'test',
    username: 'testing',
    email: 'testing@example.com',
    role: 'CLIENT',
    provider: 'local',
  }),
} as User;

export const mockUserWithoutPass = {
  _id: '123',
  name: 'test',
  username: 'testing',
  email: 'testing@example.com',
  role: 'CLIENT',
  provider: 'local',
} as UserPlainObject;

export const mockUserGoogleProfile = {
  _id: '123',
  googleId: 'google-id',
  name: 'test',
  username: 'testing',
  email: 'testing@example.com',
  role: 'CLIENT',
  provider: 'google',
  toObject: () => ({
    _id: '123',
    name: 'test',
    username: 'testing',
    email: 'testing@example.com',
    role: 'CLIENT',
    provider: 'google',
  }),
} as User;

export const mockProfile: Profile = {
  id: 'google-id',
  displayName: 'test',
  emails: [{ value: 'test@example.com', verified: true }],
  photos: [{ value: 'photo-url' }],
  provider: 'google',
  profileUrl: 'url_profile',
  _raw: '',
  _json: {
    family_name: 'test',
    given_name: 'user',
    iss: '',
    aud: '',
    sub: '',
    iat: 4424,
    exp: 44456345,
  },
};

export const mockRefreshToken = {
  _id: '123',
  email: 'test@example.com',
  token: 'hashedToken',
} as RefreshToken;
