import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class LoginDto {
    @ApiProperty({example:'Eshmat77', description:"Teacherning username"})
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty({example:'password', description:"Teacherning passwordi"})
    @IsNotEmpty()
    @IsString()
    password:string
}
