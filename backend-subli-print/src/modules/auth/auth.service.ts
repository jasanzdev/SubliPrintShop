import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPlainObject } from '../users/interfaces/user.interface';
import { JwtPayload } from './interfaces/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(credentials: LoginDto): Promise<UserPlainObject> {
    const user = await this.userService.findOne({ email: credentials.email });
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new UnauthorizedException('Please check your credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, _id, ...rest } = user.toObject<UserPlainObject>();
    return { ...rest, _id: String(_id) };
  }

  generateTokens(user: UserPlainObject) {
    const payload = {
      sub: user._id,
      username: user.username,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { access_token, refresh_token };
  }

  refreshToken(token: string) {
    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      const { sub, username, role } = payload;

      const newAccessToken = this.jwtService.sign(
        { sub, username, role },
        { expiresIn: '15m' },
      );

      return { access_token: newAccessToken };
    } catch {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
  }

  login(user: UserPlainObject) {
    const payload = { sub: user._id, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
