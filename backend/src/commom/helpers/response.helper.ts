import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHelper {
  createResponse(message: string, content?: any, aditionalMetadata?: any) {
    return {
      metadata: {
        message,
        aditionalMetadata
      },
      content,
    };
  }
}
