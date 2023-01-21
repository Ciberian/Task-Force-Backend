import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

}
