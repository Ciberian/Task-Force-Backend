import { CRUDRepositoryInterface } from '@taskforce/core';
import { UserInterface } from '@taskforce/shared-types';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UserMemoryRepository
  implements CRUDRepositoryInterface<UserEntity, string, UserInterface>
{
  private repository: { [key: string]: UserInterface } = {};

  public async create(item: UserEntity): Promise<UserInterface> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID() };
    this.repository[entry._id] = entry;
    return { ...entry };
  }

  public async findById(id: string): Promise<UserInterface> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async findByEmail(email: string): Promise<UserInterface> {
    const existUser = Object.values(this.repository).find(
      (userItem) => userItem.email === email
    );

    if (!existUser) {
      return null;
    }

    return { ...existUser };
  }

  public async update(id: string, item: UserEntity): Promise<UserInterface> {
    this.repository[id] = { ...item.toObject(), _id: id };
    return this.findById(id);
  }

  public async delete(id: string): Promise<void> {
    delete this.repository[id];
  }
}
