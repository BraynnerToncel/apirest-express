import { IsString, IsEmail, IsUUID, IsOptional, IsBoolean, MinLength, MaxLength } from 'class-validator';

// DTO para la actualización de un usuario
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  userFullName?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  userLastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(46)
  newPassword?: string;

  @IsOptional()
  @IsEmail()
  userEmail?: string;

  @IsOptional()
  @IsBoolean()
  userState?: boolean;

  @IsOptional()
  @IsUUID()
  roleId?: string;
}

export class RestorePasswordDto {
  @IsString()
  @MinLength(5)
  @MaxLength(46)
  password: string;
}
export class UpdateUserStateDto {
  @IsBoolean()
  userState: boolean;
}