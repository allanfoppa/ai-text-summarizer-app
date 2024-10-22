import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ResponseHelper } from './commom/helpers/response.helper';
import { SummarizeModule } from './summarize/summarize.module';

describe('AppModule', () => {
  let appModule: AppModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env'
        }),
        SummarizeModule,
        AppModule
      ],
      controllers: [AppController],
      providers: [AppService, ResponseHelper],
    }).compile();

    appModule = module.get<AppModule>(AppModule);
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

});
