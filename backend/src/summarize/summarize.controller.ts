import { Controller, Post, Body, UsePipes, InternalServerErrorException } from '@nestjs/common';
import { SummarizeDto } from './dto/summarize.dto';
import { SummarizeService } from './summarize.service';
import { ZodValidationPipe } from 'src/commom/pipes/zod-validation.pipe';
import { summarizeSchema } from './schema/summarize.schema';
import { ResponseHelper } from 'src/commom/helpers/response.helper';

@Controller('summarize')
export class SummarizeController {
  constructor(
    private readonly responseHelper: ResponseHelper,
    private readonly summarizeService: SummarizeService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(summarizeSchema))
  async summarize(@Body() summarizeDto: SummarizeDto) {
    try {
      const response = await this.summarizeService.summarize(summarizeDto);

      return this.responseHelper.createResponse(
        "Summarized text create with success.",
        response
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
