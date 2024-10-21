import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ResponseHelper } from './commom/helpers/response.helper';

@Injectable()
export class AppService {

  constructor(
    private readonly responseHelper: ResponseHelper,
  ){}

  metadata(): object {
    try {

      const appMetadata = {
        "title": "AI Text Summarizer API",
        "summary": "API to summarize text using AI.",
        "version": `${process.env.APP_VERSION}`,
        "author": {
          "name": "Allan Foppa Fagundes",
          "email": "allanfoppa.dev@gmail.com",
          "githubProfile": "https://github.com/allanfoppa",
        },
      }

      return this.responseHelper.createResponse(
        "Success retrieving metadata.",
        appMetadata
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
