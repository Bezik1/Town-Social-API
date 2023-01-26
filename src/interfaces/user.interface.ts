import { IsArray, IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';
import { Role } from 'src/constans';
import { Loggined } from './loggined.interface';

export class UserInterface {
    @IsString()
    @Length(4, 20)
    username: string

    @IsArray()
    roles: Role[]

    @IsEmail()
    email: string

    @IsString()
    picturePath?: string

    @IsString()
    @Length(8, 100)
   // @IsStrongPassword()
    password: string

    loggined: Loggined
}

export class CreateUserDto {
    @IsString()
    @Length(4, 20)
    username: string

    @IsEmail()
    email: string

    @IsString()
    @Length(8, 100)
    //@IsStrongPassword()
    password: string

    loggined: Loggined
}