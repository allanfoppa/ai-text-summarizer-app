import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HuggingFacePortOut {

  async summarize(text: string): Promise<string> {
    const huggingFaceToken = process.env['HUGGINGFACE_ACCESS_TOKEN']
    const huggingFaceEndpoint = process.env['HUGGINGFACE_ENDPOINT']

    let data = JSON.stringify({
      "inputs": text,
      "parameters": {
        "max_length": 100,
        "min_length": 30
      }
    });

    let config = {
      method: 'post',
      url: huggingFaceEndpoint,
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + huggingFaceToken
      },
      data
    };

    try {
      const response = await axios.request(config);

      if (response.status !== 200) {
        throw new InternalServerErrorException(response.statusText);
      }

      return response.data[0].summary_text;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
