import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example:'SUPERADMIN', description:"adminning role"})
    @IsNotEmpty()
    @IsString()
    name:string
}
