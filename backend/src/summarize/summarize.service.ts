import { Injectable } from '@nestjs/common';

import { SummarizeDto } from './dto/summarize.dto';
import { AppEntryHelper } from 'src/commom/helpers/app-entry/app.entry';

@Injectable()
export class SummarizeService {

  constructor(private readonly appEntryHelper: AppEntryHelper) {}

  async summarize(summarizeDto: SummarizeDto) {
    const inputs = summarizeDto.inputs;
    const summarizedText = await this.appEntryHelper.summarizeText(inputs);
    return summarizedText;
  }
}
