import {
  Controller,
  Patch,
  Post,
  Get,
  Body,
  Param,
  HttpStatus,
  UsePipes,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AVATAR_FILE_MAX_SIZE, AVATAR_FILE_TYPE } from './auth.constant';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);

    if (existUser.role === UserRole.Customer) {
      return fillDTO(CustomerRdo, existUser);
    }

    return fillDTO(ContractorRdo, existUser);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  public async update(@Param('id', MongoidValidationPipe) userId: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.authService.updateUser(userId, dto);

    if (updatedUser.role === UserRole.Customer) {
      return fillDTO(CustomerRdo, updatedUser);
    }

    return fillDTO(ContractorRdo, updatedUser);
  }

  @Post('/review')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.'
  })
  @UseGuards(JwtAuthGuard)
  public async createReview(@Body() dto: CreateReviewDto) {
    const newReview = await this.authService.createReview(dto);

    return fillDTO(ReviewRdo, newReview);
  }

  @Post('/:id/avatar')
  @UseInterceptors(FileInterceptor('avatar', {storage: diskStorage({destination: './user-avatars'})}))
  @UseGuards(JwtAuthGuard)
  public async uploadeAvatar(
    @Param('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: AVATAR_FILE_MAX_SIZE}),
          new FileTypeValidator({fileType: AVATAR_FILE_TYPE}),
        ],
      })
    )
    file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };

    await this.authService.updateUser(userId, {avatar: response.filename})

    return {
      status: HttpStatus.OK,
      message: 'Avatar uploaded successfully!',
      data: response,
    };
  }
}
