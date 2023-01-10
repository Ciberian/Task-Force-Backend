import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SubscriberInterface } from '@taskforce/shared-types';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_NEW_TASKS_SUBJECT } from './smtp.constant';
import { NewTasksDto } from '../email-subscriber/dto/new-tasks.dto';

@Injectable()
export class SmtpService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: SubscriberInterface) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNewTasks(newTasks: NewTasksDto) {
    await this.mailerService.sendMail({
      to: newTasks.email,
      subject: EMAIL_NEW_TASKS_SUBJECT,
      template: './new-tasks',
      context: {
        tasks: newTasks.titles
      }
    })
  }
}
