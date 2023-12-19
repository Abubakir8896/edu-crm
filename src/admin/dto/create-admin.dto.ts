import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({example:'Eshmat', description:"Adminni ismi"})
    @IsString()
    name:string

    @ApiProperty({example:'Eshmat77', description:"Adminni username"})
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty({example:'password', description:"Adminni passwordi"})
    @IsNotEmpty()
    @IsString()
    password:string

    @ApiProperty({example:'confirm password', description:"Adminni passwordi"})
    @IsNotEmpty()
    @IsString()
    confirm_password:string

    @ApiProperty({example:'@Eshmat77.gmail.com', description:"Adminni emaili"})
    @IsEmail()
    email:string

    @ApiProperty({example:'+998931208896', description:"Adminni Telefon raqami"})
    @IsPhoneNumber('UZ')
    phone:string

    @ApiProperty({example:'1', description:"Adminni rolesi"})
    @IsNotEmpty()
    @IsNumber()
    role_id:number
}
