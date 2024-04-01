import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsTaxId } from 'class-validator';

export class UpdateImageDto {

    @IsOptional()
    image? : any

    @IsString()
    name : string
    
    @IsString()
    role : string
    
}
