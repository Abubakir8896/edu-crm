import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/Admin.guard';
import { SuperAdminGuard } from '../guards/superAdmin.guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupService } from './group.service';
import { Group } from './model/group.model';

@ApiTags("group")
@Controller('group')
export class GroupController {
    constructor(private readonly groupService:GroupService){}

    @ApiOperation({summary:"Create Group"})
    @UseGuards(AdminGuard)
    @Post('create')
    async createRole(@Body() createGroupDto:CreateGroupDto):Promise<Group>{
        return this.groupService.createCategory(createGroupDto)    
    }
    
    @ApiOperation({summary:"Get All Group"})
    @ApiResponse({status:200, description:"List of Group", type:[Group]})
    @UseGuards(AdminGuard)
    @Get('all')
    async findAllCompany():Promise<Group[]>{
        return this.groupService.findAllCategory()
    }
    
    @ApiOperation({summary:"Get Group by id"})
    @ApiResponse({status:200, description:"List of Group", type:[Group]})
    @UseGuards(AdminGuard)
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<Group>{
        return this.groupService.findById(+id)
    }
    
    @UseGuards(AdminGuard)
    @ApiOperation({summary:"Delete Group"})
    @ApiResponse({status:200, description:"Success"})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.groupService.deleteById(+id)
    }
    
    @UseGuards(AdminGuard)
    @ApiOperation({summary:"Update Group"})
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateGroupDto:UpdateGroupDto){
        return this.groupService.updateById(+id,updateGroupDto)
    }
}
