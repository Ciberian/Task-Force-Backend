import { Entity } from '@taskforce/core';
import { Subscriber } from '@taskforce/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public name: string;
  public userId: string;

  constructor(emailSubscriber: Subscriber) {
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
