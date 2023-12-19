import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class UpdateTeacherDto {
    @ApiProperty({example:'Eshmat', description:"Teacherning ismi"})
    @IsString()
    first_name?:string

    @ApiProperty({example:'Eshmatov', description:"Teacherning familiyasi"})
    @IsString()
    last_name?:string

    @ApiProperty({example:'Eshmat77', description:"Teacherning username"})
    @IsString()
    username?:string

    @ApiProperty({example:'@Eshmat77.gmail.com', description:"Teacherning emaili"})
    @IsEmail()
    email?:string

    @ApiProperty({example:'+998931208896', description:"Teacherning Telefon raqami"})
    @IsPhoneNumber('UZ')
    phone?:string

    @ApiProperty({example:'Toshkent', description:"Teacherning Addresi"})
    @IsString()
    addres?:string
}
