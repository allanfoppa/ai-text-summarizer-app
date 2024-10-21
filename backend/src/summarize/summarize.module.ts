import { Module } from '@nestjs/common';
import { SummarizeService } from './summarize.service';
import { SummarizeController } from './summarize.controller';
import { ResponseHelper } from 'src/commom/helpers/response.helper';
import { HttpModule } from '@nestjs/axios';
import { AppEntryHelperModule } from 'src/commom/helpers/app-entry/app-entry.module';

@Module({
  imports: [
    HttpModule,
    AppEntryHelperModule
  ],
  controllers: [
    SummarizeController
  ],
  providers: [
    SummarizeService,
    ResponseHelper,
  ],
})
export class SummarizeModule {}
