import { Role } from '../../../data/entities/api/role/role.entity';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UpdatePermissionDto {
 
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @IsNotEmpty()
  permissionName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @IsNotEmpty()
  permissionDescription: string;

  @IsOptional()
  @IsBoolean()
  permissionState: boolean;

  @IsArray()
  role: Array<Role>;
}
