import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { UsersService } from 'src/modules/users/users.service';
import {
  mockUser,
  mockUserGoogleProfile,
  mockUserWithoutPass,
} from '../../mocks/user';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { mockProfile } from '../../mocks/google-profile';
import { AccessPayload } from 'src/common/interfaces/payloads.interface';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AuthService);
    userService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('Validate User', () => {
    it('should return user without password if credentials are valid', async () => {
      const findOneSpy = jest
        .spyOn(userService, 'findOne')
        .mockResolvedValue(mockUser);

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser({
        email: 'test@example.com',
        password: 'plain',
      });

      expect(findOneSpy).toHaveBeenCalledWith({
        email: 'test@example.com',
      });

      expect(result).toEqual(mockUserWithoutPass);
    });

    it('should throw Unauthorized exception if user not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      await expect(
        service.validateUser({
          email: 'testing@example.com',
          password: 'plain',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw Unauthorized exception if password is invalid', async () => {
      userService.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateUser({
          email: 'test@example.com',
          password: 'wrong',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateGoogleUser', () => {
    it('should return existing user if provider is google', async () => {
      userService.findOne.mockResolvedValue(mockUserGoogleProfile);

      const result = await service.validateGoogleUser(mockProfile);
      expect(result.provider).toEqual('google');
    });

    it('should throw conflict if user exists with local provider', async () => {
      userService.findOne.mockResolvedValue(mockUser);

      await expect(service.validateGoogleUser(mockProfile)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should create and return user if not found', async () => {
      const createSpy = jest
        .spyOn(userService, 'create')
        .mockResolvedValue(mockUser);

      await service.validateGoogleUser(mockProfile);

      expect(createSpy).toHaveBeenCalledWith({
        googleId: 'google-id',
        name: 'test',
        email: 'test@example.com',
        username: 'test',
        avatar: 'photo-url',
        provider: 'google',
      });
    });
  });

  describe('generateTokens', () => {
    it('Should return tokens with user payload', () => {
      const mockPayload: AccessPayload = {
        sub: '123',
        email: 'test@example.com',
        role: 'CLIENT',
      };

      jwtService.sign
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = service.generateTokens(mockPayload);
      expect(result).toEqual({
        access_token: 'access-token',
        refresh_token: 'refresh-token',
      });
    });
  });
});
