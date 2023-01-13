import { Controller, Post, Get, Body, Param, HttpStatus, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { fillDTO } from '@taskforce/core';
import { ContractorRdo } from './rdo/contractor.rdo';
import { CustomerRdo } from './rdo/customer.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRdo } from './rdo/review.rdo';
import { MongoidValidationPipe, TrimBodyValuesPipe, UserRole } from '@taskforce/shared-types';

@ApiTags('user')
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @UsePipes(new TrimBodyValuesPipe())
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    if (newUser.role === UserRole.Customer) {
      return fillDTO(CustomerRdo, newUser);
    }

    return fillDTO(ContractorRdo, newUser);
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
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);

    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found'
  })
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);

    if (existUser.role === UserRole.Customer) {
      return fillDTO(CustomerRdo, existUser);
    }

    return fillDTO(ContractorRdo, existUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/review')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.'
  })
  public async createReview(@Body() dto: CreateReviewDto) {
    const newReview = await this.authService.createReview(dto);

    return fillDTO(ReviewRdo, newReview);
  }
}
