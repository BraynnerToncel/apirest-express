
import {  IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  userName: string;

  @IsString()
  userPassword: string;
}
