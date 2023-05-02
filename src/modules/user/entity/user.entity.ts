import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'user_unittest'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    email: string;

    @Column()
    price:number
}