import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsTaxId } from 'class-validator';

export class UpdateUserDto {

    @IsOptional()
    image? : any

    @IsString()
    firstName : string
    
    @IsString()
    lastName : string
    

    @IsString()
    about : string
    

    @IsString()
    facebook : string
    

    @IsString()
    twitter : string
    

    @IsString()
    instagram : string
    

    @IsString()
    linkedIn : string
    
}
