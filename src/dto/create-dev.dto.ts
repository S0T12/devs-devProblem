import { IsNumber, IsString } from 'class-validator';

export class CreateDevDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  creator: string;

  @IsNumber()
  ideaID: number;
}
