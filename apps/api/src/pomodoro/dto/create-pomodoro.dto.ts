import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePomodoroDto {
    @IsNotEmpty()
    @IsString()
    userId : string

    @IsNumber()
    @IsNotEmpty()
    hours : number
}
