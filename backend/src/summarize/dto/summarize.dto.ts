import { IsNotEmpty, IsString } from 'class-validator';

export class SummarizeDto {
  @IsNotEmpty({ message: 'Input cannot be empty' })
  @IsString({ message: 'Todo must be of type string' })
  inputs: string;
}
