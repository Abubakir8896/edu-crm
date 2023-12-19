import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString} from "class-validator";

export class CreateLessonDto {
    @ApiProperty({example:'Algaritmlar', description:"Bugungi darsning mavzusi"})
    @IsNotEmpty()
    @IsString()
    theme:string

    @ApiProperty({example:'Takrorlash', description:"Bugungi darsni uyga vazifasi"})
    @IsNotEmpty()
    @IsString()
    homework:string
    
    @ApiProperty({example:'2023-12-18', description:"Uyga Vazifani tugash vaqti"})
    @IsNotEmpty()
    @IsDateString()
    end_time:Date
}
