import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { SmtpModule } from '../smtp/smtp.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: EmailSubscriberModel.name, schema: EmailSubscriberSchema}
    ]),
    SmtpModule
  ],
  controllers: [
    EmailSubscriberController
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository
  ],
})
export class EmailSubscriberModule {}
