import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContractorModule } from './user/user.module';

@Module({
  imports: [AuthModule, ContractorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
