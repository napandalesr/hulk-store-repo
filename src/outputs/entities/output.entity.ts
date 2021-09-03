import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Output {
  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(() => Product, product => product.id,{nullable:true})
  idProduct:number;

  @ManyToOne(()=>User, user => user.id)
  idUser:number;

  @Column({type:'float'})
  units:number;

  @Column({type:'float'})
  costUnit:number;

  @Column({type:'float'})
  costTotal:number;

  @Column({type:'float'})
  discount:number;

  @Column({type:'varchar',length:100})
  observation:string;
}
