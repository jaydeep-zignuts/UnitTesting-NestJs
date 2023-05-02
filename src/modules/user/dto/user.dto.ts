import { IsEmail, IsNotEmpty, Length, MinLength } from "class-validator";

export class UserDto{
    id:number
    @IsEmail()
    email: string;

    @IsNotEmpty()
    price: number;
} 