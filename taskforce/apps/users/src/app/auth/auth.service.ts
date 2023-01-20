import * as dayjs from 'dayjs';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ReviewRepository } from '../review/review.repository';
import { UserRepository } from '../user/user.repository';
import { ReviewEntity } from '../review/review.entity';
import { UserEntity } from '../user/user.entity';
import { UserInterface, CommandEvent, UserRole, ReviewInterface } from '@taskforce/shared-types';
import { AGE_OF_MAJORITY, RABBITMQ_SERVICE, UserUpdateErrorMessage } from './auth.constant';
import { ReviewValidationMessage } from '../review/review.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async register(dto: CreateUserDto) {
    const {email, city, password, birthDate, role, name} = dto;
    const user: UserInterface = {
      name,
      email,
      city,
      passwordHash: '',
      role,
      avatar: dto?.avatar || '',
      birthDate: dayjs(birthDate).toDate(),
      registrationDate: new Date().toISOString(),
      personalInfo: '',
      createdTasks: 0,
      newTasks: 0,
      specialization: [],
      rank: 0,
      rating: 0,
      failedTasksCount: 0,
      completedTasksCount: 0,
    };

    const userAge = dayjs().diff(user.birthDate, 'year');
    if (userAge < AGE_OF_MAJORITY) {
      throw new Error(UserUpdateErrorMessage.UserNotInLegalAge);
    }

    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new Error(UserUpdateErrorMessage.UserAlreadyExist);
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

    createdUser.age =  dayjs().diff(user.birthDate, 'year');

    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(UserUpdateErrorMessage.UserNotFound);
    }

    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(UserUpdateErrorMessage.UserPasswordWrong);
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

  async updateUser(id: string, dto: UpdateUserDto): Promise<UserInterface> {
    const userBeforeUpdate = await this.userRepository.findById(id);
    if (!userBeforeUpdate) {
      throw new Error(`User with id ${id}, does not exist`);
    }

    if (dto.birthDate) {
      const newUserAge = dayjs().diff(dto.birthDate, 'year');
      if (newUserAge < AGE_OF_MAJORITY) {
        throw new Error(UserUpdateErrorMessage.UserNotInLegalAge);
      }
    }

    const userEntity = new UserEntity({
      ...userBeforeUpdate,
      ...dto,
      birthDate: dto.birthDate ? dayjs(dto.birthDate).toDate() : false || userBeforeUpdate.birthDate,
    });

    const updatedUser = await this.userRepository.update(id, userEntity);
    updatedUser.age = dayjs().diff(updatedUser.birthDate, 'year');

    return updatedUser;
  }

  async changePassword(id: string, dto: ChangePasswordDto): Promise<UserInterface> {
    const {newPassword, oldPassword} = dto;
    const userBeforeUpdate = await this.userRepository.findById(id);
    if (!userBeforeUpdate) {
      throw new Error(`User with id - ${id}, does not exist`);
    }

    const userEntity = new UserEntity(userBeforeUpdate);
    if (!(await userEntity.comparePassword(oldPassword))) {
      throw new Error(`The old password - ${oldPassword}, is incorrect`);
    }
    await userEntity.setPassword(newPassword);

    return this.userRepository.update(id, userEntity);
  }

  async createReview(dto: CreateReviewDto) {
    const {customerId, contractorId, taskId, reviewText, reviewRating} = dto;
    const review: ReviewInterface = {
      customerId: new mongoose.Types.ObjectId(customerId),
      contractorId: new mongoose.Types.ObjectId(contractorId),
      taskId,
      reviewText,
      reviewRating
    };

    const existReview = await this.reviewRepository.findByTaskId(review.taskId);
    if (existReview) {
      throw new Error(ReviewValidationMessage.ReviewAlreadyExist);
    }

    const reviewEntity = new ReviewEntity(review);
    const createdReview = await this.reviewRepository.create(reviewEntity);

    const contractorReviews = await this.reviewRepository.findUserReviews(review.contractorId);
    const contractor = await this.userRepository.findById(contractorId);
    const contractorRatingSum = contractorReviews.reduce((sum, review) => sum += review.reviewRating, 0);
    const contractorAverageRating = Number((contractorRatingSum/(contractorReviews.length + contractor.failedTasksCount)).toFixed(1));

    const userEntity_1 = new UserEntity({...contractor, rating: contractorAverageRating});
    await this.userRepository.update(contractorId, userEntity_1);

    const allContractors = await this.userRepository.findContractors();
    const contractorIndex = allContractors.findIndex((contractor) => String(contractor._id) === contractorId);
    const userEntity_2 = new UserEntity({...allContractors[contractorIndex], rank: contractorIndex + 1});
    await this.userRepository.update(contractorId, userEntity_2);

    return createdReview;
  }
}
