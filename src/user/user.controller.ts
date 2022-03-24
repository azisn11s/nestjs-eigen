import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { RegisterDto } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  /**
   * Get user detail
   * @param user User
   * @returns User
   */
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
  /**
   * Get users
   * @returns []: User
   */
  @Get('/')
  index() {
    return this.userService.list();
  }
  /**
   * Create user
   */
  @Post()
  store(@Body() dto: RegisterDto) {
    return this.userService.add(dto);
  }
}
