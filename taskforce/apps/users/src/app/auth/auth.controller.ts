import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { fillDTO } from '@taskforce/core';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { AuthService } from './auth.service';

@Controller('user')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDTO(UserRdo, newUser);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDTO(LoggedUserRdo, verifiedUser);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDTO(UserRdo, existUser);
  }
}
