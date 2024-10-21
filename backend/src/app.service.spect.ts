import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service'; // Update path if needed
import { ResponseHelper } from './commom/helpers/response.helper'; // Update path if needed
import { InternalServerErrorException } from '@nestjs/common';

describe('AppService', () => {
  let appService: AppService;
  let responseHelper: ResponseHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ResponseHelper,
          useValue: {
            createResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    responseHelper = module.get<ResponseHelper>(ResponseHelper);
  });

  describe('metadata', () => {
    it('should return metadata successfully', () => {
      // Arrange: Mock the responseHelper's createResponse method
      const metadata = {
        title: 'AI Text Summarizer API',
        summary: 'API to summarize text using AI.',
        version: `${process.env.APP_VERSION}`,
        author: {
          name: 'Allan Foppa Fagundes',
          email: 'allanfoppa.dev@gmail.com',
          githubProfile: 'https://github.com/allanfoppa',
        },
      };
      const expectedResponse = {
        message: 'Success retrieving metadata.',
        data: metadata,
      };

      (responseHelper.createResponse as jest.Mock).mockReturnValue(expectedResponse);

      // Act: Call the metadata method
      const result = appService.metadata();

      // Assert: Ensure the createResponse method was called with correct args
      expect(responseHelper.createResponse).toHaveBeenCalledWith(
        'Success retrieving metadata.',
        metadata,
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should throw InternalServerErrorException if an error occurs', () => {
      // Arrange: Simulate an error
      (responseHelper.createResponse as jest.Mock).mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      // Act & Assert: Expect the method to throw the InternalServerErrorException
      expect(() => appService.metadata()).toThrow(InternalServerErrorException);
    });
  });
});
