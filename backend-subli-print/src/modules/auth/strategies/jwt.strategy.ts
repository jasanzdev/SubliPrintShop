import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config/envs';
import { UserPlainObject } from 'src/common/interfaces/user.interface';
import { AccessPayload } from 'src/common/interfaces/payloads.interface';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.jwtAccessSecret,
    });
  }

  async validate(payload: AccessPayload): Promise<UserPlainObject> {
    const user = await this.userService.findOne({ _id: payload.sub });
    if (!user) throw new UnauthorizedException();
    return user.toObject<UserPlainObject>();
  }
}
