import { RefreshToken } from 'src/modules/auth/schemas/refresh-token.schema';

export const mockRefreshToken = {
  _id: '123',
  email: 'test@example.com',
  token: 'hashedToken',
} as RefreshToken;
