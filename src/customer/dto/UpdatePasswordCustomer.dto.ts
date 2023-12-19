import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class UpdatePasswordCustomerDto {

    @ApiProperty({example:'Eshmat77', description:"Foydalanuvchi username"})
    @IsNotEmpty()
    @IsString()
    old_password:string

    @ApiProperty({example:'password', description:"Foydalanuvchi passwordi"})
    @IsNotEmpty()
    @IsString()
    new_password:string

    @ApiProperty({example:'confirm password', description:"Foydalanuvchi passwordi"})
    @IsNotEmpty()
    @IsString()
    confirm_password:string
}
