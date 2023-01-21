import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotifyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

}
