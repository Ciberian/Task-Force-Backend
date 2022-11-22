import { Controller, Post, Get, Body, Param, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillDTO } from '@taskforce/core';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { AuthService } from './auth.service';

@ApiTags('user')
@Controller('user')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDTO(UserRdo, newUser);
  }

  @Post('login')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDTO(LoggedUserRdo, verifiedUser);
  }

  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDTO(UserRdo, existUser);
  }
}
