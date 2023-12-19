import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class UpdateCustomerDto {
    @ApiProperty({example:'Eshmat', description:"Foydalanuvchi ismi"})
    @IsString()
    full_name?:string

    @ApiProperty({example:'Eshmat77', description:"Foydalanuvchi username"})
    @IsString()
    username?:string

    @ApiProperty({example:'@Eshmat77.gmail.com', description:"Foydalanuvchi emaili"})
    @IsEmail()
    email?:string

    @ApiProperty({example:'+998931208896', description:"Foydalanuvchi Telefon raqami"})
    @IsPhoneNumber('UZ')
    phone_number?:string


    @ApiProperty({example:'Toshkent', description:"Foydalanuvchi Addresi"})
    @IsString()
    addres?:string

    @ApiProperty({example:'Toshkent', description:"Foydalanuvchi Addresi"})
    @IsString()
    gender?:string

    @ApiProperty({example:'Toshkent', description:"Foydalanuvchi Addresi"})
    group_id?:number
}
