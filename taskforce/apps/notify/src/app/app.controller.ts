import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get } from '@nestjs/common';

@Controller('notify')
export class AppController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('/')
  public async sendMails() {
    return this.mailerService.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "bar@example.com, baz@example.com, s.imaev@mail.ru",
      subject: "Hello ✔",
      text: "Hello world",
      html: "<b style='color: red'>Hello world</b>",
    });
  }
}
