/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Matches(/62[0-9]{2,20}/, {message: "MSISDN has prefix 62"})
  msisdn: string;

  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
