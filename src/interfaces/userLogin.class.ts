import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UserLogin {
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    device: string
}