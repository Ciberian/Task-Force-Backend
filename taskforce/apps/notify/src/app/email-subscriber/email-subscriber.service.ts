import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { SubscriberValidationMessage } from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { SmtpService } from '../smtp/smtp.service';
import { NewTasksDto } from './dto/new-tasks.dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly smtpService: SmtpService
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const {email} = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      throw new ConflictException(SubscriberValidationMessage.EmailNotUnique);
    }

    this.smtpService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriber));
  }

  public async sendNewTasks(newTasks: NewTasksDto) {
    this.smtpService.sendNewTasks(newTasks);
  }
}
