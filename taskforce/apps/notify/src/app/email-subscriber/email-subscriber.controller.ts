import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@taskforce/shared-types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NewTasksDto } from './dto/new-tasks.dto';
import { EmailSubscriberService } from './email-subscriber.service';

@Controller()
export class EmailSubscriberController {
  constructor(private readonly subscriberService: EmailSubscriberService) {}

  @EventPattern({cmd: CommandEvent.AddSubscriber})
  public async create(subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({cmd: CommandEvent.SendNewTasks})
  public async send(newTasks: NewTasksDto) {
    return this.subscriberService.sendNewTasks(newTasks);
  }
}
