import { PickType } from '@nestjs/mapped-types';
import { CreateDevDto } from './create-dev.dto';
import { IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UpdateDevDto extends PickType(CreateDevDto, [
  'title',
  'description',
]) {
  @IsNumber()
  id: ObjectId;
}
