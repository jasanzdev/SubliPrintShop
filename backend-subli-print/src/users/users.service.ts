import * as bcrypt from 'bcrypt';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import ResetPasswordDto from './dto/reset-pass.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(input: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const newUser = new this.userModel({
      ...input,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(
    field: Partial<Record<keyof User, string>>,
  ): Promise<User | null> {
    return this.userModel.findOne(field).exec();
  }

  async update(input: UpdateUserInput): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(input.id, input, { new: true })
      .exec();
  }

  async resetPassword(input: ResetPasswordDto) {
    const { username, password, newPassword } = input;
    const user = await this.findOne({ username: username });
    if (!user) throw new NotFoundException('User does not exists');
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) throw new BadGatewayException('Invalid Password');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.userModel
      .findByIdAndUpdate(user._id, {
        password: hashedPassword,
      })
      .exec();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
