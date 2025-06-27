import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshPayload } from 'src/common/interfaces/payloads.interface';
import { envs } from 'src/config/envs';
import { TokenService } from '../services/token.service';
import { UserPlainObject } from 'src/common/interfaces/user.interface';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private tokenService: TokenService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.['refresh_token'] as string,
      ]),
      secretOrKey: envs.jwtRefreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: RefreshPayload) {
    const refreshToken = req.cookies['refresh_token'] as string;
    if (!refreshToken) throw new UnauthorizedException();

    const tokenIsValid = await this.tokenService.validateRefreshToken({
      email: payload.email,
      token: refreshToken,
    });

    if (!tokenIsValid) throw new ForbiddenException('Invalid token');

    const user = await this.userService.findOne({ email: payload.email });

    if (!user) throw new UnauthorizedException();

    return user.toObject<UserPlainObject>();
  }
}
