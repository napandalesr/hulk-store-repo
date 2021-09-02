import { IsDecimal, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsNumber()
  idCategory:number;

  @IsString()
  name:string;

  @IsString()
  description:string;

  @IsNumber()
  suggestedSalePrice:number;
}
