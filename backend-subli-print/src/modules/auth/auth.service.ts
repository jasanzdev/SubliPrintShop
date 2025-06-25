import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(credentials: LoginDto): Promise<User | null> {
    const user = await this.userService.findOne({ email: credentials.email });

    return user && (await bcrypt.compare(credentials.password, user.password))
      ? user
      : null;
  }

  login(user: User) {
    const payload = { id: user._id, email: user.email, role: user.role };

    return this.jwtService.sign(payload);
  }
}
