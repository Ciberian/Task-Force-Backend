import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotifyService } from './notify.service';

@ApiTags('notify')
@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}
  
}
