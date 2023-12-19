import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateCategoryDto {
    @ApiProperty({example:'.NET', description:"Categoryning nomi"})
    @IsString()
    name?:string
}
