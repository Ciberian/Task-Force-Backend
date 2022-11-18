import { Module } from '@nestjs/common';
import { ContractorMemoryRepository } from './contractor-memory.repository';

@Module({
  imports: [],
  providers: [ContractorMemoryRepository],
  exports: [ContractorMemoryRepository],
})
export class ContractorModule {}
