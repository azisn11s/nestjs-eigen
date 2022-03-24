import {
  IsDecimal,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LogisticDto {
  @IsString()
  @IsNotEmpty()
  logistic_name: string;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  destination_name: string;

  @IsString()
  @IsNotEmpty()
  origin_name: string;

  @IsString()
  @IsNotEmpty()
  duration: string;
}
