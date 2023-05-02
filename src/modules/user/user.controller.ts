import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { UserDto } from "./dto/user.dto";


@Controller('user')
export class UserController{
     constructor(@Inject('UserService') private userService: UserService){}

    @Get('all')
    @UsePipes(ValidationPipe)
    async all(@Req() req:Request, @Res() res:Response){
        const { count, page } = req.query;
        if(!count || !page){
            res.status(400).send({msg: 'Missing count or page query parameter'});

        }else{
            res.send(200)
        }
        // return await this.userService.all();
    }

    @Post('create')
    async create(@Body() user:UserDto){
       const response = await this.userService.create(user);
       return response;
    }

    @Get('getData')
    async getData(){
        const allUsers = await this.userService.getData();
        return allUsers;
    }

    @Delete('deleteUser/:id')
    async deleteUser(@Param('id') id:number){
        const user= await this.userService.deleteUser(id);
        return user;
    }

    @Patch('updateUser/:id')
    async updateUser(@Param('id') id:number, @Body() userData:UserDto){
        const user = await this.userService.updateUser(id, userData);
        return user;
    }
    
    

    
}