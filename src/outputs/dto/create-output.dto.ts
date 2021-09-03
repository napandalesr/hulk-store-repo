import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOutputDto {
  @IsNumber()
  idProduct:number;

  @IsNumber()
  idUser:number;

  @IsNumber()
  units:number;

  @IsNumber()
  costUnit:number;

  @IsNumber()
  discount:number;

  @IsOptional()
  @IsString()
  observation:string;
}
