import { ApiResponse } from '@nestjs/swagger';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ISendMailOptions } from '@nestjs-modules/mailer';

@Controller('notify')
export class AppController {
  constructor(private readonly appService: AppService,) {}

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Письма успешно отправлены'
  })
  public async sendMail() {
    const mail: ISendMailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "bar@example.com, baz@example.com, s.imaev@mail.ru",
      subject: "Hello ✔",
      text: "Hello world",
      html: "<b style='color: red'>Hello world</b>",
    }

    return this.appService.sendEmail(mail);
  }
}
