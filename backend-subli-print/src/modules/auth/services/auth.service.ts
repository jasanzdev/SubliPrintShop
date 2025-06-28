import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { Profile } from 'passport-google-oauth20';
import { User } from 'src/modules/users/schemas/user.schema';
import { UserPlainObject } from 'src/common/interfaces/user.interface';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

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
}
