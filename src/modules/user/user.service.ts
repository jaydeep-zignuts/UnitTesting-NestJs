import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/modules/user/dto/user.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";

@Injectable()
export class UserService{
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity> ){}
 
    private user = [
        {
            email: 'jdp@gmail.com'
        },
        {
            email: 'jaydeep@gmail.com'
        },
        {
            email: 'patel@gmail.co'
        },
    ]
    async all(){
        // return await this.
    }
    async create(user:UserDto){
        // const { email }= user;
        // const userData = await this.user.find((user) => user.email === email);
        // if(user){

        //     return {
        //         status: 'success'
        //     }
        // }else{
        //     throw new BadRequestException();
        // }
        const newUser=await this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }
    async getData(){
        const users=await this.userRepository.find({});
        return users;
    }
    async deleteUser(id:number){
        return await this.userRepository.delete({id:id})
    }
    async updateUser(id:number, user: UserDto){
        return await this.userRepository.update({id:id},{
            email: user.email,
            price:user.price
        })
    }
    
}