import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString } from "class-validator";

export class CreatePaymentCardDto {
    @ApiProperty({example:'1', description:"Qaysi Kurs Uchun Pul to'layotkani"})
    @IsNotEmpty()
    course_id:number


    @ApiProperty({example:'2000000', description:"Necha pul to'layotkani"})
    @IsNotEmpty()
    amount:number

    @ApiProperty({example:'2023-18-12', description:"Qaysi kuni pul tolagani"})
    @IsNotEmpty()
    @IsDateString()
    date:Date
}
