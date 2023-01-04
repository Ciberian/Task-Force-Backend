import * as dayjs from 'dayjs';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface, CommandEvent, UserRole } from '@taskforce/shared-types';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import {
  AGE_OF_MAJORITY,
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
  AUTH_USER_NOT_LEGAL_AGE,
  RABBITMQ_SERVICE
} from './auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async register(dto: CreateUserDto) {
    const {email, city, password, birthDate, role, name} = dto;
    const user: UserInterface = {
      email,
      city,
      passwordHash: '',
      birthDate: dayjs(birthDate).toDate(),
      role,
      name,
      avatar: dto?.avatar || '',
    };

    const userAge = dayjs().diff(user.birthDate, 'year');
    if (userAge < AGE_OF_MAJORITY) {
      throw new Error(AUTH_USER_NOT_LEGAL_AGE);
    }

    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new Error(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user).setPassword(password);
    const createdUser = await this.userRepository.create(userEntity);

    if (createdUser.role === UserRole.Contractor) {
      this.rabbitClient.emit(
      {
        cmd: CommandEvent.AddSubscriber
      },
      {
        email: createdUser.email,
        name: createdUser.name,
        userId: createdUser._id.toString(),
      });
    }
    
    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  async loginUser(user: UserInterface) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
