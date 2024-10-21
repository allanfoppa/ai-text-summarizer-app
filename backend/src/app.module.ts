import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummarizeModule } from './summarize/summarize.module';
import { ResponseHelper } from './commom/helpers/response.helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SummarizeModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ResponseHelper,
  ],
})
export class AppModule {}
