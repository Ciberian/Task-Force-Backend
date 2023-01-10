import { Entity } from '@taskforce/core';
import { SubscriberInterface } from '@taskforce/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, SubscriberInterface {
  public id: string;
  public email: string;
  public name: string;
  public userId: string;

  constructor(emailSubscriber: SubscriberInterface) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.id = entity.id ?? '';
    this.email = entity.email;
    this.userId = entity.userId;
    this.name = entity.name;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
