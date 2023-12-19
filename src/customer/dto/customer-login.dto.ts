import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class LoginDto {
    @ApiProperty({example:'Eshmat77', description:"Foydalanuvchi username"})
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty({example:'password', description:"Foydalanuvchi passwordi"})
    @IsNotEmpty()
    @IsString()
    password:string
}
