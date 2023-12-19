import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateCourseDto {
    @ApiProperty({example:'Bootcamp', description:"Course nomi"})
    @IsString()
    name?:string

    @ApiProperty({example:"Bu Kursta siz 1 yil ta'lim olasiz", description:"course xaqida ma'lumot"})
    @IsString()
    description?:string

    @ApiProperty({example:'2000000', description:"Coursening narxi"})
    payment?:number

    @ApiProperty({example:'1', description:"Coursening category IDsi"})
    category_id?:number
}
