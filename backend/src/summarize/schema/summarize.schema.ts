import { z } from 'zod';

export const summarizeSchema = z
  .object({
    inputs: z.string().min(200).max(5000),
  })
  .required();

export type SummarizeDto = z.infer<typeof summarizeSchema>;
