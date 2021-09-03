import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto {
  @IsString()
  @MaxLength(60)
  username:string;

  @IsString()
  @MaxLength(60)
  @MinLength(8)
  password:string;
}
