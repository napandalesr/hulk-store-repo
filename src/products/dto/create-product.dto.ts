import { IsDecimal, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsNumber()
  idCategory:number;

  @IsString()
  name:string;

  @IsString()
  description:string;

  @IsOptional()
  @IsNumber()
  suggestedSalePrice:number;
}
