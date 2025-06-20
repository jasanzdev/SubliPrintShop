import { Body, Controller, Post } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @SkipThrottle({ short: true, medium: true })
  @Post('register')
  register(@Body() createUserInput: CreateUserInput) {
    return this.authService.register(createUserInput);
  }
}
