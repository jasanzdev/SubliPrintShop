import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { envs } from 'src/config/envs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() credentials: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(credentials);
    const { access_token, refresh_token } =
      this.authService.generateTokens(user);

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
  refresh(@Req() req: Request) {
    const token = req.cookies?.refresh_token as string;
    if (!token) throw new UnauthorizedException('Token not found');

    return this.authService.refreshToken(token);
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token', { path: '/auth/refresh' });
  }
}
