import { Test, TestingModule } from '@nestjs/testing';
import { HuggingFacePortOut } from './summarize.port.out';
import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('axios');

describe('HuggingFacePortOut', () => {
  let huggingFacePortOut: HuggingFacePortOut;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HuggingFacePortOut],
    }).compile();

    huggingFacePortOut = module.get<HuggingFacePortOut>(HuggingFacePortOut);
  });

  it('should be defined', () => {
    expect(huggingFacePortOut).toBeDefined();
  });

  it('should summarize text successfully', async () => {
    // Arrange
    const text = 'This is a test input.';
    const mockedResponse = {
      status: 200,
      data: [{ summary_text: 'This is a summary.' }],
    };

    (axios.request as jest.Mock).mockResolvedValue(mockedResponse);

    // Act
    const result = await huggingFacePortOut.summarize(text);

    // Assert
    expect(axios.request).toHaveBeenCalled();
    expect(result).toEqual('This is a summary.');
  });

  it('should throw an InternalServerErrorException if response status is not 200', async () => {
    // Arrange
    const text = 'This is a test input.';
    const mockedResponse = {
      status: 500,
      statusText: 'Internal Server Error',
    };

    (axios.request as jest.Mock).mockResolvedValueOnce(mockedResponse);

    // Act & Assert
    await expect(huggingFacePortOut.summarize(text)).rejects.toThrow(InternalServerErrorException);
  });

  it('should handle errors thrown by axios', async () => {
    // Arrange
    const text = 'This is a test input.';
    const errorMessage = 'Network Error';

    (axios.request as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(huggingFacePortOut.summarize(text)).rejects.toThrow(new Error(errorMessage));
  });
});
