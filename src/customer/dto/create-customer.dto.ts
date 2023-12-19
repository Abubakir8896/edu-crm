import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty({example:'Eshmat', description:"Foydalanuvchi ismi"})
    @IsNotEmpty()
    @IsString()
    full_name:string

    @ApiProperty({example:'Eshmat77', description:"Foydalanuvchi username"})
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty({example:'password', description:"Foydalanuvchi passwordi"})
    @IsNotEmpty()
    @IsString()
    password:string

    @ApiProperty({example:'confirm password', description:"Foydalanuvchi passwordi"})
    @IsNotEmpty()
    @IsString()
    confirm_password:string

    @ApiProperty({example:'@Eshmat77.gmail.com', description:"Foydalanuvchi emaili"})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({example:'+998931208896', description:"Foydalanuvchi Telefon raqami"})
    @IsPhoneNumber('UZ')
    phone_number:string

    @ApiProperty({example:'Toshkent', description:"Foydalanuvchi Addresi"})
    @IsNotEmpty()
    @IsString()
    addres:string

    @ApiProperty({example:'Toshkent', description:"Foydalanuvchi Addresi"})
    @IsNotEmpty()
    @IsString()
    gender:string

    @ApiProperty({example:'Toshkent', description:"Foydalanuvchi Addresi"})
    @IsNotEmpty()
    group_id:number
}