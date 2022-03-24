import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class ListDto {
  @IsNotEmpty()
  @IsString()
  origin_name: string;

  @IsNotEmpty()
  @IsString()
  destination_name: string;
}
