import { Test, TestingModule } from '@nestjs/testing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './commom/interceptors/response.interceptor';

// Mocking the required parts of the application
jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

describe('Bootstrap', () => {
  let app: { enableCors: jest.Mock; useGlobalInterceptors: jest.Mock; listen: jest.Mock };

  beforeEach(async () => {
    app = {
      enableCors: jest.fn(),
      useGlobalInterceptors: jest.fn(),
      listen: jest.fn(),
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(app);

    const { bootstrap } = await import('./main'); // Import the bootstrap function dynamically
    await bootstrap(); // Call the bootstrap function
  });

  it('should enable CORS', () => {
    expect(app.enableCors).toHaveBeenCalled();
  });

  it('should register the ResponseInterceptor globally', () => {
    expect(app.useGlobalInterceptors).toHaveBeenCalledWith(expect.any(ResponseInterceptor));
  });

  it('should listen on port 4000', () => {
    expect(app.listen).toHaveBeenCalledWith(4000);
  });
});
