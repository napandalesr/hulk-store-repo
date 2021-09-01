import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MaxLength(60)
  name:string;

  @IsString()
  @MaxLength(60)
  username:string;

  @IsString()
  @MaxLength(60)
  @MinLength(8)
  password:string;
}
