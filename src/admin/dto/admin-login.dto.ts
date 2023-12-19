import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class AdminLoginDto {
    @ApiProperty({example:'Eshmat77', description:"Adminni username"})
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty({example:'password', description:"Adminni passwordi"})
    @IsNotEmpty()
    @IsString()
    password:string
}
