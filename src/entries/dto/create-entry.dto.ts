import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEntryDto {
  @IsOptional()
  @IsNumber()
  idProduct:number;

  @IsNumber()
  idUser:number;

  @IsString()
  name:string;

  @IsNumber()
  units:number;

  @IsNumber()
  costUnit:number;

  @IsNumber()
  costTotal:number;
}
