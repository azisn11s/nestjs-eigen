/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  msisdn: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
