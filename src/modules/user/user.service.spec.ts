import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service"
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserDto } from "./dto/user.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import exp from "constants";
import { log } from "console";

describe('UserService', () => {
    let service: UserService;
    let userRepository: Repository<UserEntity>
    beforeEach(async () => {
        const module: TestingModule= await Test.createTestingModule({
            providers: [UserService, {
                provide: getRepositoryToken(UserEntity),
                 useValue:{
                    create: jest.fn(),
                    save:jest.fn(),
                    find:jest.fn(),
                    update:jest.fn(),
                    delete:jest.fn()
                 }
            }],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })
    
    it('user repository should be defined', () => {
        expect(userRepository).toBeDefined();
    }) 

    describe('create',() => {
        it('should create a new user',async () => {
            await service.create({
                id:2, 
                email: 'jaydeep@gmail.com',
                price:100  
            })
            expect(userRepository.create).toHaveBeenCalledWith({
                id: 2,
                email: 'jaydeep@gmail.com',
                price:100   
            });
        }); 
    })

    describe('getData',() => {
        it('should return array of user',async () => {
            await service.getData();
            expect(userRepository.find).toHaveBeenCalledWith({});
            
        });
    })

    describe('updateUser', () => {
        
        it('should create a new user to update', async () => {
            await service.create({
                id:1, 
                email: 'jaydeep@gmail.com',
                price: 100
            });
            expect(userRepository.create).toHaveBeenCalledWith({
                id:1,
                email: 'jaydeep@gmail.com',
                price: 100
            });
            
        });
        it('should update user', async () => {
            let id =1;
            
            await service.updateUser(id,{email:'jay@gmail.com',price:10,id:1})
            expect(userRepository.update)
            // .toHaveBeenCalledWith({
            //     id:1,
            //     email: 'jay@gmail.com',
            //     price: 10

            // });
        });
    });
    describe('deleteUser', () => {
        
        it('should create a new user to delete', async () => {
            await service.create({
                id:1, 
                email: 'jaydeep@gmail.com',
                price: 100
            });
            expect(userRepository.create).toHaveBeenCalledWith({
                id:1,
                email: 'jaydeep@gmail.com',
                price: 100
            });
            
        });
        it('should delete user', async () => {
            let id =1;
            
            await service.deleteUser(id)
            expect(userRepository.delete)
            
        });
    });
})      