import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { UsersService } from 'src/modules/users/users.service';
import {
  mockProfile,
  mockSavedUser,
  mockSavedUserGoogle,
} from '../../../utils/constants';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { UserPlainObject } from 'src/common/interfaces/user.interface';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UsersService>;

  const mockUserWithoutPass = {
    _id: '123',
    name: 'test',
    username: 'testing',
    email: 'testing@example.com',
    role: 'CLIENT',
    provider: 'local',
  } as UserPlainObject;

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
      ],
    }).compile();

    service = module.get(AuthService);
    userService = module.get(UsersService);
  });

  describe('Validate User', () => {
    it('should return user without password if credentials are valid', async () => {
      const findOneSpy = jest
        .spyOn(userService, 'findOne')
        .mockResolvedValue(mockSavedUser);

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
      userService.findOne.mockResolvedValue(mockSavedUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateUser({
          email: 'testing@example.com',
          password: 'wrong',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateGoogleUser', () => {
    it('should return existing user if provider is google', async () => {
      userService.findOne.mockResolvedValue(mockSavedUserGoogle);

      const result = await service.validateGoogleUser(mockProfile);
      expect(result.provider).toEqual('google');
    });

    it('should throw conflict if user exists with local provider', async () => {
      userService.findOne.mockResolvedValue(mockSavedUser);

      await expect(service.validateGoogleUser(mockProfile)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should create and return user if not found', async () => {
      const createSpy = jest
        .spyOn(userService, 'create')
        .mockResolvedValue(mockSavedUser);

      await service.validateGoogleUser(mockProfile);

      expect(createSpy).toHaveBeenCalledWith({
        googleId: 'google-id',
        name: 'test',
        email: 'testing@example.com',
        username: 'testing',
        avatar: 'photo-url',
        provider: 'google',
      });
    });
  });
});
