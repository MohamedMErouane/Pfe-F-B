import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsTaxId } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsString()
    image? : string

    @IsString()
    firstName : string
    
    @IsString()
    lastName : string
    
    @IsOptional()
    @IsString()
    about : string
    
    @IsOptional()
    @IsString()
    facebook : string
    
    @IsOptional()
    @IsString()
    twitter : string
    
    @IsOptional()
    @IsString()
    instagram : string
    
    @IsOptional()
    @IsString()
    linkedIn : string
    
}
