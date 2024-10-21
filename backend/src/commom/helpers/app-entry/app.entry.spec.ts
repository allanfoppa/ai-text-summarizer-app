import { Test, TestingModule } from '@nestjs/testing';
import { AppEntryHelper } from './app.entry';
import { HuggingFacePortOut } from 'src/port/out/hugging-face/summarize.port.out';

describe('AppEntryHelper', () => {
  let appEntryHelper: AppEntryHelper;
  let huggingFacePortOut: HuggingFacePortOut;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppEntryHelper,
        {
          provide: HuggingFacePortOut,
          useValue: {
            summarize: jest.fn(), // Mock the summarize method
          },
        },
      ],
    }).compile();

    appEntryHelper = module.get<AppEntryHelper>(AppEntryHelper);
    huggingFacePortOut = module.get<HuggingFacePortOut>(HuggingFacePortOut);
  });

  it('should be defined', () => {
    expect(appEntryHelper).toBeDefined();
  });

  it('should call summarize method of HuggingFacePortOut', async () => {
    // Arrange
    const inputs = 'This is a test input.';
    const summarizedText = 'This is a summary.';

    // Mock the summarize method to return the expected summarized text
    (huggingFacePortOut.summarize as jest.Mock).mockResolvedValue(summarizedText);

    // Act
    const result = await appEntryHelper.summarizeText(inputs);

    // Assert
    expect(huggingFacePortOut.summarize).toHaveBeenCalledWith(inputs);
    expect(result).toEqual(summarizedText);
  });

  it('should throw an error if summarize method fails', async () => {
    // Arrange
    const inputs = 'This is a test input.';
    const errorMessage = 'Summarization failed';

    // Mock the summarize method to throw an error
    (huggingFacePortOut.summarize as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(appEntryHelper.summarizeText(inputs)).rejects.toThrowError(errorMessage);
  });
});
