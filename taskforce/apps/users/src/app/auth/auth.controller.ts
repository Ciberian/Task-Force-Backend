import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create (@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login () {
    return {'test': 'Call login method'}
  }
}
