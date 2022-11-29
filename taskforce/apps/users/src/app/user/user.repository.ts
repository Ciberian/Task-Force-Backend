import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from '@taskforce/shared-types';
import { CRUDRepositoryInterface } from '@taskforce/core';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository implements CRUDRepositoryInterface<UserEntity, string, UserInterface> {
  constructor(
    @InjectModel(UserModel.name) private readonly UserModel: Model<UserModel>) {
  }

  public async create(item: UserEntity): Promise<UserInterface> {
    const newUser = new this.UserModel(item);
    return newUser.save();
  }

  public async findById(id: string): Promise<UserInterface | null> {
    return this.UserModel
      .findById(id)
      .exec();
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return this.UserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<UserInterface> {
    return this.UserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async delete(id: string): Promise<void> {
    this.UserModel.deleteOne({id});
  }
}
