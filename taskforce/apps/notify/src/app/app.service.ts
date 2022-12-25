import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendEmail(mail: ISendMailOptions) {
    return this.mailerService.sendMail(mail);
  }
}
