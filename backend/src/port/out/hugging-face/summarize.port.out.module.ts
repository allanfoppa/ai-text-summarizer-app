import { Module } from '@nestjs/common';
import { HuggingFacePortOut } from './summarize.port.out';

@Module({
  providers: [ HuggingFacePortOut ],
  exports: [ HuggingFacePortOut ],
})
export class HuggingFacePortOutModule {}
