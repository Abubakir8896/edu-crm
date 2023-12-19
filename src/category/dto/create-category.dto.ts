import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class CreatecategoryDto {
    @ApiProperty({example:'Full Stack', description:"Category nomi"})
    @IsNotEmpty()
    @IsString()
    name:string
}
