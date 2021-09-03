import { IsNumber } from "class-validator";

export class CreateEntryDto {
  @IsNumber()
  idProduct:number;

  @IsNumber()
  idUser:number;

  @IsNumber()
  units:number;

  @IsNumber()
  costUnit:number;
}
