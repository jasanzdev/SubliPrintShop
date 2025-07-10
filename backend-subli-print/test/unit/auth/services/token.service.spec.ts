import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { RefreshToken } from 'src/modules/auth/schemas/refresh-token.schema';
import { TokenService } from 'src/modules/auth/services/token.service';
import { AccessPayload } from 'src/common/interfaces/payloads.interface';
import { envs } from 'src/config/envs';

jest.mock('bcrypt');

describe('TokenService', () => {
  let tokenService: TokenService;
  let jwtService: jest.Mocked<JwtService>;
  let refreshTokenModel: jest.Mocked<Model<RefreshToken>>;

  const mockRefreshToken = {
    _id: '123',
    email: 'test@example.com',
    token: 'hashedToken',
  } as RefreshToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: getModelToken(RefreshToken.name),
          useValue: {
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    tokenService = module.get(TokenService);
    jwtService = module.get(JwtService);
    refreshTokenModel = module.get(getModelToken(RefreshToken.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateRefreshToken', () => {
    it('should return true if token is valid', async () => {
      const email = 'test@example.com';
      const token = 'plainToken';
      const hashedToken = 'hashedToken';

      const mockExec = jest.fn().mockResolvedValue(mockRefreshToken);
      const mockQuery: any = { exec: mockExec };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const findOneSpy = refreshTokenModel.findOne.mockReturnValue(mockQuery);

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await tokenService.validateRefreshToken({
        token,
        email,
      });

      expect(findOneSpy).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(token, hashedToken);
      expect(result).toBeTruthy();
    });

    it('should return false if no token found', async () => {
      const email = 'notfound@example.com';
      const token = 'plainToken';

      const mockExec = jest.fn().mockResolvedValue(null);
      const mockQuery: any = { exec: mockExec };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const findOneSpy = refreshTokenModel.findOne.mockReturnValue(mockQuery);

      const result = await tokenService.validateRefreshToken({
        token,
        email,
      });

      expect(findOneSpy).toHaveBeenCalledWith({ email });
      expect(result).toBeFalsy();
    });

    it('should return false if is invalid token', async () => {
      const email = 'test@example.com';
      const token = 'wrongToken';
      const hashedToken = 'hashedToken';

      const mockExec = jest.fn().mockResolvedValue(mockRefreshToken);
      const mockQuery: any = { exec: mockExec };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const findOneSpy = refreshTokenModel.findOne.mockReturnValue(mockQuery);

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await tokenService.validateRefreshToken({
        token,
        email,
      });

      expect(findOneSpy).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(token, hashedToken);
      expect(result).toBeFalsy();
    });
  });

  describe('generateTokens', () => {
    it('Should return tokens with user payload', async () => {
      const mockPayload: AccessPayload = {
        sub: '123',
        email: 'test@example.com',
        role: 'CLIENT',
      };

      jwtService.signAsync
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('newRefreshToken');

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-refresh-token');

      const signAsyncSpy =
        jwtService.signAsync.mockResolvedValue('signed token');

      const result = await tokenService.generateTokens(mockPayload);

      expect(signAsyncSpy).toHaveBeenCalledWith(mockPayload, {
        secret: envs.jwtAccessSecret,
        expiresIn: '15m',
      });
      expect(signAsyncSpy).toHaveBeenCalledWith(
        { email: 'test@example.com' },
        { secret: envs.jwtRefreshSecret, expiresIn: '7d' },
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('newRefreshToken', 10);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(refreshTokenModel.findOneAndUpdate).toHaveBeenCalledWith(
        { email: 'test@example.com' },
        { token: 'hashed-refresh-token' },
        { upsert: true },
      );
      expect(result).toEqual({
        access_token: 'access-token',
        refresh_token: 'newRefreshToken',
      });
    });
  });

  describe('revokeTokens', () => {
    it('should delete token by email', async () => {
      const deleteOneSpy = refreshTokenModel.deleteOne.mockResolvedValue({
        acknowledged: true,
        deletedCount: 1,
      });

      await tokenService.revokeTokens('test@example.com');

      expect(deleteOneSpy).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });
  });
});
