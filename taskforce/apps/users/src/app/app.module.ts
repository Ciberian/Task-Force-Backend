import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContractorModule } from './contractor/contractor.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [AuthModule, ContractorModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
