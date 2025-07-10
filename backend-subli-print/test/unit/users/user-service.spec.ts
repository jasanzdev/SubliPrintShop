import * as bcrypt from 'bcrypt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/modules/users/schemas/user.schema';
import { UsersService } from 'src/modules/users/users.service';
import {
  mockCreateUserInput,
  mockResetPasswordInput,
  mockSavedUser,
  mockSavedUserGoogle,
  mockUpdateUserInput,
  mockUserGoogleProfile,
} from '../../utils/constants';
import { MockUserModel } from '../../utils/mock-user.model';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

jest.mock('bcrypt');

describe('UserService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: MockUserModel,
        },
      ],
    }).compile();

    usersService = module.get(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should return user with hashed password if provider is local', async () => {
      (bcrypt.hash as jest.Mock).mockReturnValue('hashedPassword');

      jest
        .spyOn(MockUserModel, 'findOne')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      const result = await usersService.create(mockCreateUserInput);

      expect(bcrypt.hash).toHaveBeenCalledWith('Password123!', 10);
      expect(result).toEqual(mockSavedUser);
    });

    it('should throw ConflictException if user already exist', async () => {
      jest
        .spyOn(MockUserModel, 'findOne')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSavedUser) });

      await expect(usersService.create(mockCreateUserInput)).rejects.toThrow(
        ConflictException,
      );
      await expect(usersService.create(mockCreateUserInput)).rejects.toThrow(
        'An user with this email already exists',
      );
    });

    it('should return user with googleId if provider is google', async () => {
      (bcrypt.hash as jest.Mock).mockReturnValue('hashedPassword');

      const result = await usersService.create(mockUserGoogleProfile);

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(result.googleId).not.toBeNull();
      expect(result).toEqual(mockSavedUserGoogle);
    });
  });

  describe('findAll', () => {
    it('should return an users list', async () => {
      const result = await usersService.findAll();
      expect(Array.isArray(result)).toBeTruthy();
    });
  });

  describe('findOne', () => {
    it('should return an users if exists', async () => {
      const result = await usersService.findOne({
        email: 'testing@example.com',
      });
      expect(result).toEqual(mockSavedUser);
    });

    it('should return null if user does not exists', async () => {
      jest
        .spyOn(MockUserModel, 'findOne')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      const result = await usersService.findOne({
        username: 'wrong',
      });

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should return user with modified properties if user exists', async () => {
      const result = await usersService.update(mockUpdateUserInput);

      expect(result).toEqual(mockSavedUser);
    });

    it('should return null if user does not exists', async () => {
      jest
        .spyOn(MockUserModel, 'findByIdAndUpdate')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      const result = await usersService.update(mockUpdateUserInput);

      expect(result).toBeNull();
    });
  });

  describe('resetPassword', () => {
    it('should return the user with the new password hashed if the user exists', async () => {
      const findOneSpy = jest
        .spyOn(MockUserModel, 'findOne')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSavedUser) });

      (bcrypt.compare as jest.Mock).mockReturnValue(true);
      (bcrypt.hash as jest.Mock).mockReturnValue('hashedPassword');

      const findByIdAndUpdateSpy = jest
        .spyOn(MockUserModel, 'findByIdAndUpdate')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSavedUser) });

      const result = await usersService.resetPassword(mockResetPasswordInput);

      expect(findOneSpy).toHaveBeenCalledWith({
        email: mockResetPasswordInput.email,
      });

      expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(mockSavedUser._id, {
        password: 'hashedPassword',
      });
      expect(result).toEqual(mockSavedUser);
    });

    it('should throw NotFoundException if the user does not exists', async () => {
      jest
        .spyOn(MockUserModel, 'findOne')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      await expect(
        usersService.resetPassword(mockResetPasswordInput),
      ).rejects.toThrow('User does not exists');

      await expect(
        usersService.resetPassword(mockResetPasswordInput),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if the password is incorrect', async () => {
      jest
        .spyOn(MockUserModel, 'findOne')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSavedUser) });

      (bcrypt.compare as jest.Mock).mockReturnValue(false);

      await expect(
        usersService.resetPassword(mockResetPasswordInput),
      ).rejects.toThrow('Invalid Password');

      await expect(
        usersService.resetPassword(mockResetPasswordInput),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should return true if the user exists', async () => {
      const result = await usersService.remove('123');
      expect(MockUserModel.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(result).toBeTruthy();
    });

    it('should return false if the user does not exists', async () => {
      jest
        .spyOn(MockUserModel, 'findByIdAndDelete')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      const result = await usersService.remove('3645');

      expect(MockUserModel.findByIdAndDelete).toHaveBeenCalledWith('3645');
      expect(result).toBeFalsy();
    });
  });
});
