import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(60)
  name:string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(60)
  username:string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  @MinLength(8)
  password:string;
}
