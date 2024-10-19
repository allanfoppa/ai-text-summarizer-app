import { Module } from '@nestjs/common';
import { SummarizeService } from './summarize.service';
import { SummarizeController } from './summarize.controller';
import { ResponseHelper } from 'src/commom/helpers/response.helper';

@Module({
  controllers: [SummarizeController],
  providers: [
    SummarizeService,
    ResponseHelper
  ],
})
export class SummarizeModule {}
