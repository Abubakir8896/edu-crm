import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString} from "class-validator";

export class UpdateLessonDto {
    @ApiProperty({example:'Algaritmlar', description:"Bugungi darsning mavzusi"})
    @IsString()
    theme?:string

    @ApiProperty({example:'Takrorlash', description:"Bugungi darsni uyga vazifasi"})
    @IsString()
    homework?:string
    
    @ApiProperty({example:'2023-12-18', description:"Uyga Vazifani tugash vaqti"})
    @IsDateString()
    end_time?:Date
}
