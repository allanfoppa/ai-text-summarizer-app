import { ZodValidationPipe } from './zod-validation.pipe'; // Adjust the import according to your file structure
import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

describe('ZodValidationPipe', () => {
  let zodValidationPipe: ZodValidationPipe;

  const mockSchema = z.object({
    inputs: z.string().min(200).max(5000)
  });

  beforeEach(() => {
    zodValidationPipe = new ZodValidationPipe(mockSchema);
  });

  it('should return parsed value when input is valid', () => {
    const validInput = { inputs: 'John DoeLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' };

    const result = zodValidationPipe.transform(validInput, { type: 'body', metatype: null });

    expect(result).toEqual(validInput);
  });

  it('should throw BadRequestException when input is less then 200 characters', () => {
    const invalidInput = { inputs: 'John DoeLorem ipsum dolor sit amet' };

    try {
      zodValidationPipe.transform(invalidInput, { type: 'body', metatype: null });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toContain('The attribute inputs: String must contain at least 200 character(s)');
    }
  });

  it('should throw BadRequestException when input is greater then 5000 characters', () => {
    let longString = "a".repeat(5001);
    const invalidInput = { inputs: longString };

    try {
      zodValidationPipe.transform(invalidInput, { type: 'body', metatype: null });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toContain('The attribute inputs: String must contain at most 5000 character(s)');
    }
  });
});
