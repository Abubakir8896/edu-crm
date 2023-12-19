import { ApiProperty } from '@nestjs/swagger';

export class UpdateScheduleDto {
    @ApiProperty({example:'1', description:"Studentnig IDsi"})
    student_id?:number

    @ApiProperty({example:'1', description:"Davomat uchun Gruppani IDsi"})
    group_id?:number

    @ApiProperty({example:'2023-12-18', description:"Davomat Kuni"})
    date?:Date

    @ApiProperty({example:'true', description:"Kelgan kelmaganligi"})
    status?:boolean
}
