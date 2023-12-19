import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class CreateGroupDto {
    @ApiProperty({example:'N9', description:"Group nomi"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:'Bu gruppa 2023 yil ochilgan', description:"Group xaqida ma'lumot"})
    @IsNotEmpty()
    @IsString()
    description:string

    @ApiProperty({example:'20', description:"Groupdagi maximal studentlar soni"})
    @IsNotEmpty()
    students_limit:number

    @ApiProperty({example:'1', description:"gruppa qaysi coursega tegishliligi"})
    @IsNotEmpty()
    course_id:number

    @ApiProperty({example:'1', description:"Gruppani Ustozini IDsi"})
    @IsNotEmpty()
    teacher_id:number
}
