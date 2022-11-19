import { Injectable } from '@nestjs/common';
import { UserInterface } from '@taskforce/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { ContractorMemoryRepository } from '../contractor/contractor-memory.repository';
import * as dayjs from 'dayjs';
import { ContractorEntity } from '../contractor/contractor.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userMemoryRepository: ContractorMemoryRepository) {}

  async register(dto: CreateUserDto) {
    const {email, city, password, birthDate, role, name} = dto;
    const user: UserInterface = {
      _id: '',
      email,
      city,
      passwordHash: password,
      birthDate: dayjs(birthDate).toDate(),
      role,
      name,
      avatar: dto?.avatar || '',
    }

    const existUser = await this.userMemoryRepository.findByEmail(email);

    if (existUser) {
      throw new Error('User already exists!');
    }

    const userEntity = await new ContractorEntity(user).setPassword(password);

    return this.userMemoryRepository.create(userEntity);
  }

  async verifyUser() {
    return 'return';
  }
}
