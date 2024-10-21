import { Injectable } from '@nestjs/common';
import { HuggingFacePortOut } from "src/port/out/hugging-face/summarize.port.out";

@Injectable()
export class AppEntryHelper {
  constructor(private readonly huggingFacePortOut: HuggingFacePortOut) {}

  summarizeText(inputs: string): Promise<string> {
    return this.huggingFacePortOut.summarize(inputs);
  }
}
