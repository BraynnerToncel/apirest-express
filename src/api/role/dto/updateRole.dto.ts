import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested
}
  from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(45)
  roleName?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  roleDescription?: string;

  @IsOptional()
  @IsBoolean()
  roleState?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRolesPermissionDto)
  permissions?: Array<UpdateRolesPermissionDto>;
}

export class UpdateRolesPermissionDto {
  @IsString()
  permissionId: string;
}
