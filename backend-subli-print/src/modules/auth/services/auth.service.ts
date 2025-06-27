import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { AccessPayload } from 'src/common/interfaces/payloads.interface';
import { User } from 'src/modules/users/schemas/user.schema';
import { UserPlainObject } from 'src/common/interfaces/user.interface';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(credentials: LoginDto): Promise<UserPlainObject> {
    const user = await this.userService.findOne({ email: credentials.email });
    if (
      !user ||
      !(await bcrypt.compare(credentials.password, user.password as string))
    ) {
      throw new UnauthorizedException('Please check your credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, _id, ...rest } = user.toObject<UserPlainObject>();
    return { ...rest, _id: String(_id) };
  }

  async validateGoogleUser(profile: Profile): Promise<User> {
    const email =
      profile.emails?.find((e) => e.verified === true) || profile.emails?.[0];

    if (!email) throw new UnauthorizedException('User account not Found');

    const user = await this.userService.findOne({ email: email.value });

    if (user) {
      if (user.provider === 'local')
        throw new ConflictException(
          'This email is already registered with password',
        );

      return user;
    }

    return await this.userService.create({
      googleId: profile.id,
      name: profile.displayName,
      email: email.value,
      username: profile.username || email.value.split('@')[0],
      avatar: profile.photos?.[0]?.value,
      provider: 'google',
    });
  }

  refreshToken(token: string) {
    try {
      const payload: AccessPayload = this.jwtService.verify(token);
      return this.generateTokens(payload);
    } catch {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
  }

  login(user: UserPlainObject) {
    const accessPayload: AccessPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    return this.generateTokens(accessPayload);
  }

  generateTokens(payload: AccessPayload) {
    const { sub, email, role } = payload;
    const newAccessToken = this.jwtService.sign(
      { sub, email, role },
      { expiresIn: '15m' },
    );

    const newRefreshToken = this.jwtService.sign(
      { email: email },
      { expiresIn: '7d' },
    );

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }
}
