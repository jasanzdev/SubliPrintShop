import { Profile } from 'passport-google-oauth20';
import { GoogleProfile } from 'src/common/interfaces/user.interface';
import { CreateUserInput } from 'src/modules/users/dto/create-user.input';
import { ResetPasswordInput } from 'src/modules/users/dto/reset-pass.input';
import { UpdateUserInput } from 'src/modules/users/dto/update-user.input';
import { User } from 'src/modules/users/schemas/user.schema';

export const validOrigin = 'https://myfrontend.com';
export const invalidOrigin = 'https://another-site.com';
export const csrfRoute = '/api/sps1/csrf/csrf-token';
export const loginRoute = '/api/sps1/auth/login';

export const mockSavedUser = {
  _id: '123',
  name: 'test',
  username: 'testing',
  email: 'testing@example.com',
  password: 'hashedPassword',
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

export const mockSavedUserArray = [
  mockSavedUser,
  {
    _id: '345',
    name: 'test2',
    username: 'testing2',
    email: 'testing2@example.com',
    password: 'hashedPassword',
    role: 'CLIENT',
    provider: 'local',
    toObject: () => ({
      _id: '345',
      name: 'test2',
      username: 'testing2',
      email: 'testing2@example.com',
      role: 'CLIENT',
      provider: 'local',
    }),
  } as User,
];

export const mockCreateUserInput: CreateUserInput = {
  name: 'test',
  username: 'testing',
  email: 'testing@example.com',
  password: 'Password123!',
  confirmPassword: 'Password123!',
  provider: 'local',
  role: 'CLIENT',
};

export const mockUpdateUserInput: UpdateUserInput = {
  id: '123',
  name: 'test',
};

export const mockResetPasswordInput: ResetPasswordInput = {
  email: 'testing@example.com',
  password: 'Password123!',
  newPassword: 'Password@123',
  confirmPassword: 'Password@123',
};

export const mockSavedUserGoogle = {
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
  emails: [{ value: 'testing@example.com', verified: true }],
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

export const mockUserGoogleProfile: GoogleProfile = {
  googleId: 'google-id',
  name: 'test',
  username: 'testing',
  email: 'testing@example.com',
  avatar: 'photo-url',
  role: 'CLIENT',
  provider: 'google',
};
