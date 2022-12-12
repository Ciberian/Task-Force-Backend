import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from '@taskforce/shared-types';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import {
  AGE_OF_MAJORITY,
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
  AUTH_USER_NOT_LEGAL_AGE
} from './auth.constant';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

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

    return this.userRepository.create(userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new Error(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(password)) {
      throw new Error(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
