import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeService } from './summarize.service';
import { AppEntryHelper } from 'src/commom/helpers/app-entry/app.entry';
import { SummarizeDto } from './dto/summarize.dto';

describe('SummarizeService', () => {
  let summarizeService: SummarizeService;
  let appEntryHelper: AppEntryHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummarizeService,
        {
          provide: AppEntryHelper,
          useValue: {
            summarizeText: jest.fn(),
          },
        },
      ],
    }).compile();

    summarizeService = module.get<SummarizeService>(SummarizeService);
    appEntryHelper = module.get<AppEntryHelper>(AppEntryHelper);
  });

  it('should be defined', () => {
    expect(summarizeService).toBeDefined();
  });

  it('should return summarized text successfully', async () => {
    // Arrange: Define the input and expected summarized text
    const summarizeDto: SummarizeDto = { inputs: 'This is a test text.' };
    const summarizedText = 'This is a summary.';

    // Mock the summarizeText method to return the expected summarized text
    (appEntryHelper.summarizeText as jest.Mock).mockResolvedValue(summarizedText);

    // Act: Call the summarize method of the service
    const result = await summarizeService.summarize(summarizeDto);

    // Assert: Check if the helper's summarizeText method was called correctly
    expect(appEntryHelper.summarizeText).toHaveBeenCalledWith(summarizeDto.inputs);
    expect(result).toEqual(summarizedText);
  });

  it('should throw an error if summarizeText fails', async () => {
    // Arrange: Define the input and simulate an error in summarizeText
    const summarizeDto: SummarizeDto = { inputs: 'This is a test text.' };
    const errorMessage = 'Summarization failed';

    (appEntryHelper.summarizeText as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Act & Assert: Expect the summarize method to throw the error
    await expect(summarizeService.summarize(summarizeDto)).rejects.toThrowError(errorMessage);
  });
});
