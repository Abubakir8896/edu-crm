import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateRoleDto {
    @ApiProperty({example:'SuperAdmin', description:"Adminning Rolesi"})
    @IsString()
    name?:string
}
