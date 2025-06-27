import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { envs } from 'src/config/envs';
import { AuthGuard } from '@nestjs/passport';
import { UserPlainObject } from 'src/common/interfaces/user.interface';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() credentials: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(credentials);
    const { access_token, refresh_token } =
      await this.tokenService.generateTokens({
        sub: user._id,
        email: user.email,
        role: user.role,
      });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: envs.nodeEnv === 'production',
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { access_token };
  }

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(
    @GetUser() user: UserPlainObject,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      await this.tokenService.generateTokens({
        sub: user._id,
        email: user.email,
        role: user.role,
      });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: envs.nodeEnv === 'production',
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { access_token };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(
    @GetUser() user: UserPlainObject,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refresh_token } = await this.tokenService.generateTokens({
      sub: user._id,
      email: user.email,
      role: user.role,
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: envs.nodeEnv === 'production',
      secure: true,
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(envs.frontendRedirectUri);
  }

  @Post('logout')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async logout(
    @GetUser() user: UserPlainObject,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.tokenService.revokeTokens(user.email);
    res.clearCookie('refresh_token', { path: '/auth/refresh' });
    return;
  }
}
