import { Module } from '@nestjs/common';
import { AppEntryHelper } from './app.entry';
import { HuggingFacePortOutModule } from 'src/port/out/hugging-face/summarize.port.out.module';

@Module({
  imports: [HuggingFacePortOutModule],
  providers: [AppEntryHelper],
  exports: [AppEntryHelper],
})
export class AppEntryHelperModule {}
