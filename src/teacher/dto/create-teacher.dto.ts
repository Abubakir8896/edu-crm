import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class CreateTeacherDto {
    @ApiProperty({example:'Eshmat', description:"Teacherning ismi"})
    @IsNotEmpty()
    @IsString()
    full_name:string

    @ApiProperty({example:'Eshmat77', description:"Teacherning username"})
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty({example:'password', description:"Teacherning passwordi"})
    @IsNotEmpty()
    @IsString()
    password:string

    @ApiProperty({example:'confirm password', description:"Teacherning passwordi"})
    @IsNotEmpty()
    @IsString()
    confirm_password:string

    @ApiProperty({example:'@Eshmat77.gmail.com', description:"Teacherning emaili"})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({example:'+998931208896', description:"Teacherning Telefon raqami"})
    @IsPhoneNumber('UZ')
    phone:string

    @ApiProperty({example:'Toshkent', description:"Teacherning Addresi"})
    @IsNotEmpty()
    @IsString()
    addres:string
}