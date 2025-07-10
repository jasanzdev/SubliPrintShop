import { CreateUserInput } from 'src/modules/users/dto/create-user.input';
import { GoogleProfile } from 'src/common/interfaces/user.interface';
import {
  mockSavedUser,
  mockSavedUserArray,
  mockSavedUserGoogle,
} from './constants';

export class MockUserModel {
  save = jest.fn();

  constructor(data: CreateUserInput | GoogleProfile) {
    Object.assign(this, data);
    if (data.provider === 'google') {
      this.save.mockResolvedValue(mockSavedUserGoogle);
    } else {
      this.save.mockResolvedValue(mockSavedUser);
    }
  }

  static find = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSavedUserArray) });

  static findOne = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSavedUser) });

  static findByIdAndUpdate = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSavedUser) });

  static findByIdAndDelete = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockSavedUser) });
}
