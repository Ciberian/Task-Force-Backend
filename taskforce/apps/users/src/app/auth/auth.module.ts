import { Module } from '@nestjs/common';
import { ContractorModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ContractorModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
