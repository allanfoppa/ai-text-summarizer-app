import { Injectable } from '@nestjs/common';
import { SummarizeDto } from './dto/summarize.dto';

@Injectable()
export class SummarizeService {
  async summarize(summarizeDto: SummarizeDto) {

    const huggingFaceToken = process.env['HUGGINGFACE_ACCESS_TOKEN']
    const huggingFaceEndpoint = process.env['HUGGINGFACE_ENDPOINT']

    let data = JSON.stringify({
      "inputs": summarizeDto.inputs,
      "parameters": {
        "max_length": 100,
        "min_length": 30
      }
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + huggingFaceToken
      },
      data
    };

    try {
      const response = await fetch(huggingFaceEndpoint, config);
      // TODO: STOP HERE
      console.log(response);
      // return response.data[0].summary_text;
    }
    catch (error) {
      console.log(error);
    }
  }
}
