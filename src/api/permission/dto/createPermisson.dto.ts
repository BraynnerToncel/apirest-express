import { Role } from '../../../data/entities/api/role/role.entity';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';



export class CreatePermissionDto {


  @IsString()
  @MinLength(4)
  @MaxLength(100)
  @IsNotEmpty()
  permissionName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(100)
  @IsNotEmpty()
  permissionDescription: string;

  @IsOptional()
  @IsBoolean()
  permissionState: boolean;

  
  
}
