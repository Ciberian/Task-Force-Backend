import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubscriberInterface } from '@taskforce/shared-types';
import { CRUDRepositoryInterface } from '@taskforce/core';
import { EmailSubscriberModel } from './email-subscriber.model';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepositoryInterface<EmailSubscriberEntity, string, SubscriberInterface> {
  constructor(@InjectModel(EmailSubscriberModel.name) private readonly emailSubscriberModel: Model<EmailSubscriberModel>) {}

  public async create(item: EmailSubscriberEntity): Promise<SubscriberInterface> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async delete(id: string): Promise<void> {
    this.emailSubscriberModel.deleteOne({id});
  }

  public async findById(id: string): Promise<SubscriberInterface | null> {
    return this.emailSubscriberModel
        .findOne({id})
        .exec();
  }

  public async update(id: string, item: EmailSubscriberEntity): Promise<SubscriberInterface> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async findByEmail(email: string): Promise<SubscriberInterface | null> {
    return this.emailSubscriberModel
      .findOne({email})
      .exec()
  }
}
