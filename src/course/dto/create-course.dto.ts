import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class CreateCourseDto {
    @ApiProperty({example:'Bootcamp', description:"Course nomi"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:"Bu Kursta siz 1 yil ta'lim olasiz", description:"course xaqida ma'lumot"})
    @IsNotEmpty()
    @IsString()
    description:string

    @ApiProperty({example:'2000000', description:"Coursening narxi"})
    @IsNotEmpty()
    payment:number

    @ApiProperty({example:'1', description:"Coursening category IDsi"})
    @IsNotEmpty()
    category_id:number
}
