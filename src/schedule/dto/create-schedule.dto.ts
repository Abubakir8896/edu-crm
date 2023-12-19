import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class CreateScheduleDto {
    @ApiProperty({example:'1', description:"Studentnig IDsi"})
    @IsNotEmpty()
    student_id:number

    @ApiProperty({example:'1', description:"Davomat uchun Gruppani IDsi"})
    @IsNotEmpty()
    group_id:number

    @ApiProperty({example:'2023-12-18', description:"Davomat Kuni"})
    @IsNotEmpty()
    date:Date

    @ApiProperty({example:'true', description:"Kelgan kelmaganligi"})
    @IsNotEmpty()
    status:boolean
}
