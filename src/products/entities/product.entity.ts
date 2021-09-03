import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(()=>Category, category => category.id)
  idCategory:number;

  @Column({type:'varchar', length:30})
  name:string;

  @Column({type:'varchar', length:100})
  description:string;

  @Column({type:'float', nullable:true})
  suggestedSalePrice:number;

  @Column({type:'float'})
  existencias:number;
}
