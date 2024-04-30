import { IsOptional, IsEmail, IsBoolean, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  userFullName?: string;  


  @IsOptional()
  @IsString()
  userLastName?: string;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsEmail()
  userEmail?: string;

  @IsOptional()
  @IsString()
  userPassword?: string;

  @IsOptional()
  @IsBoolean()
  userState?: boolean;
}
