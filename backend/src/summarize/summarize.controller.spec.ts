import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeController } from './summarize.controller';
import { SummarizeService } from './summarize.service';
import { ResponseHelper } from 'src/commom/helpers/response.helper';
import { InternalServerErrorException } from '@nestjs/common';
import { SummarizeDto } from './dto/summarize.dto';

describe('SummarizeController', () => {
  let summarizeController: SummarizeController;
  let summarizeService: SummarizeService;
  let responseHelper: ResponseHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummarizeController],
      providers: [
        {
          provide: SummarizeService,
          useValue: {
            summarize: jest.fn(), // Mock the summarize method
          },
        },
        {
          provide: ResponseHelper,
          useValue: {
            createResponse: jest.fn(), // Mock the createResponse method
          },
        },
      ],
    }).compile();

    summarizeController = module.get<SummarizeController>(SummarizeController);
    summarizeService = module.get<SummarizeService>(SummarizeService);
    responseHelper = module.get<ResponseHelper>(ResponseHelper);
  });

  it('should return a successful summary response', async () => {
    // Arrange: Mock the service and response helper
    const summarizeDto: SummarizeDto = { inputs: 'This is a test text to summarize.' };
    const summarizedText = 'This is a summary.';
    const expectedResponse = {
      message: 'Summarized text create with success.',
      data: summarizedText,
    };

    (summarizeService.summarize as jest.Mock).mockResolvedValue(summarizedText);
    (responseHelper.createResponse as jest.Mock).mockReturnValue(expectedResponse);

    // Act: Call the summarize method of the controller
    const result = await summarizeController.summarize(summarizeDto);

    // Assert: Check if the service and response helper are called correctly
    expect(summarizeService.summarize).toHaveBeenCalledWith(summarizeDto);
    expect(responseHelper.createResponse).toHaveBeenCalledWith(
      'Summarized text create with success.',
      summarizedText
    );
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an InternalServerErrorException if an error occurs', async () => {
    // Arrange: Simulate an error in the service
    const summarizeDto: SummarizeDto = { inputs: 'This is a test text to summarize.' };
    const errorMessage = 'Something went wrong';

    (summarizeService.summarize as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Act & Assert: Expect the controller to throw an InternalServerErrorException
    await expect(summarizeController.summarize(summarizeDto)).rejects.toThrow(
      new InternalServerErrorException(errorMessage)
    );
  });
});
