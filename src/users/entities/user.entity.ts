import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar',length:60, nullable: false})
  name:string;

  @Column({type:'varchar',length:60, nullable: false})
  username:string;

  @Column({type:'varchar',length:60, nullable: false, select:false})
  password:string;

  @Column({name: 'created_at' ,type:'timestamp'})
  createdAt:Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(){
    if(!this.password){
      return
    }
    this.password = await hash(this.password,10);
  }
}
