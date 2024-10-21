import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeModule } from './summarize.module';
import { SummarizeService } from './summarize.service';
import { SummarizeController } from './summarize.controller';
import { ResponseHelper } from 'src/commom/helpers/response.helper';
import { AppEntryHelperModule } from 'src/commom/helpers/app-entry/app-entry.module';
import { HttpModule } from '@nestjs/axios';

describe('SummarizeModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        SummarizeModule,
        HttpModule,
        AppEntryHelperModule
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide SummarizeService', () => {
    const summarizeService = module.get<SummarizeService>(SummarizeService);
    expect(summarizeService).toBeDefined();
  });

  it('should provide SummarizeController', () => {
    const summarizeController = module.get<SummarizeController>(SummarizeController);
    expect(summarizeController).toBeDefined();
  });

  it('should provide ResponseHelper', () => {
    const responseHelper = module.get<ResponseHelper>(ResponseHelper);
    expect(responseHelper).toBeDefined();
  });
});
