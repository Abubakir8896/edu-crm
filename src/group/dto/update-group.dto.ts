import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateGroupDto {
    @ApiProperty({example:'N9', description:"Group nomi"})
    @IsString()
    name?:string

    @ApiProperty({example:'Bu gruppa 2023 yil ochilgan', description:"Group xaqida ma'lumot"})
    @IsString()
    description?:string

    @ApiProperty({example:'20', description:"Groupdagi maximal studentlar soni"})
    students_limit?:number

    @ApiProperty({example:'1', description:"gruppa qaysi coursega tegishliligi"})
    course_id?:number

    @ApiProperty({example:'1', description:"Gruppani Ustozini IDsi"})
    teacher_id?:number
}
