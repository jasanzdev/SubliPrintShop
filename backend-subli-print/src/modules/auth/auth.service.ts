import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserInput } from 'src/modules/users/dto/create-user.input';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOne({ email: email });
    if (!user) throw new UnauthorizedException('Please check your credentials');

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass)
      throw new UnauthorizedException('Please check your credentials');

    return user;
  }

  register(createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }
}
