import { IsNotEmpty, IsEmail, IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userFullName: string;

  @IsNotEmpty()
  @IsString()
  userLastName: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  userPassword: string;

  @IsBoolean()
  @IsOptional()
  userState: boolean;
}
