import { IsEmail, IsOptional, IsString } from "class-validator"

export class CreateUserDto {

    @IsOptional()
    image : string

    @IsString()
    @IsEmail()
    email : string

    @IsString()
    firstName : string
    
    @IsString()
    lastName : string
    
    @IsString()
    phone : string
    @IsString()
    password : string

    @IsOptional()
    username : string
}
