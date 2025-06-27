import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { envs } from 'src/config/envs';
import { UserPlainObject } from 'src/common/interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: envs.googleId,
      clientSecret: envs.googleSecret,
      callbackURL: envs.googleRedirectUri,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateGoogleUser(profile);
    return user.toObject<UserPlainObject>();
  }
}
