import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: RegisterDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
