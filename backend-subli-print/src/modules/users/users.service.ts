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
import ResetPasswordDto from './dto/reset-pass.input';
import { User } from './schemas/user.schema';
import { GoogleProfile } from 'src/common/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserInput | GoogleProfile): Promise<User> {
    const newUser = new this.userModel({ ...data });
    if (data?.provider && data.provider !== 'google') {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      newUser.provider = 'local';
      newUser.password = hashedPassword;
      return newUser.save();
    }

    return newUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(field: Partial<Record<keyof User, string>>): Promise<User | null> {
    return this.userModel.findOne(field).exec();
  }

  update(input: UpdateUserInput): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(input.id, input, { new: true })
      .exec();
  }

  async resetPassword(input: ResetPasswordDto) {
    const { username, password, newPassword } = input;
    const user = await this.findOne({ username: username });
    if (!user) throw new NotFoundException('User does not exists');
    const isValidPass = await bcrypt.compare(password, user.password as string);
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
