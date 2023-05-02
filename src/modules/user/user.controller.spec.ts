import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller"
import { UserModule } from "./user.module";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import exp from "constants";
import { BadGatewayException, BadRequestException } from "@nestjs/common";

describe('UserController',()=>{
    let controller : UserController;
    let service: UserService
    let reqMock={
        query:{},
    } as unknown as Request

    const statusResponseMock ={
        send: jest.fn((x)=> x),
    }
    let resMock={
        status : jest.fn((x)=>(statusResponseMock)),
        send: jest.fn((x)=>x) 
    } as unknown as  Response

    beforeEach(async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            controllers:[UserController],
            providers:[{
                provide: 'UserService',
                useValue:{
                    create: jest.fn((x) => x),
                },
            }], 
        }).compile();
        controller=module.get<UserController>(UserController);
        service=module.get<UserService>('UserService');
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })
    it('should be defined', () => {
        expect(service).toBeDefined();
    }) 
    describe('all', () => {
        it('should return a status of 400', () => {
            controller.all(reqMock, resMock);
            expect(resMock.status).toHaveBeenCalledWith(400);
            expect(statusResponseMock.send).toHaveBeenCalledWith({
                msg:'Missing count or page query parameter'
            })
        });
        it('should return a status of 200 when query params are present',async () => {
            reqMock.query={
                count: '10',
                page: '1',
            }; 
            await controller.all(reqMock, resMock );
            expect(resMock.send).toHaveBeenCalledWith(200); 
        })
    });

    describe('create', () => {
        it('should return a successful response', async () => {
            jest.spyOn(service, 'create').mockImplementation(() => {
                throw new BadRequestException();
            })
            try{
                const response = await controller.create({
                    id:1,
                    email: 'jaydeep@gmail.com',
                    price:100
                }); 
            }catch(e){
                console.log(e);
                 
            }
            // expect(response).toStrictEqual({ status: 'success'})
        });
    })

    
});  