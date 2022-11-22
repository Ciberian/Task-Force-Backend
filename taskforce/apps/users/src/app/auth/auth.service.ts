import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from '@taskforce/shared-types';
import { UserMemoryRepository } from '../user/user-memory.repository';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { UserEntity } from '../user/user.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(private readonly userMemoryRepository: UserMemoryRepository) {}

  async register(dto: CreateUserDto) {
    const {email, city, password, birthDate, role, name} = dto;
    const user: UserInterface = {
      _id: '',
      email,
      city,
      passwordHash: '',
      birthDate: dayjs(birthDate).toDate(),
      role,
      name,
      avatar: dto?.avatar || '',
    };

    const existUser = await this.userMemoryRepository.findByEmail(email);

    if (existUser) {
      throw new Error(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user).setPassword(password);

    return this.userMemoryRepository.create(userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userMemoryRepository.findByEmail(email);

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
    return this.userMemoryRepository.findById(id);
  }
}
