import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class UpdatePasswordDto {
    @ApiProperty({example:'Abubakir8896', description:"Adminni eski passwordi"})
    @IsNotEmpty()
    @IsString()
    past_password:string

    @ApiProperty({example:'new Password', description:"Adminni yangi passwordi"})
    @IsNotEmpty()
    @IsString()
    new_password:string

    @ApiProperty({example:'confirm password', description:"Adminni passwordi"})
    @IsNotEmpty()
    @IsString()
    confirm_password:string
}
