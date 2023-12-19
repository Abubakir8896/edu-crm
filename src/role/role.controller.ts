import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './model/role.model';
import { RoleService } from './role.service';
import { SuperAdminGuard } from './../guards/superAdmin.guard';

@ApiTags("Role")
@Controller('role')
export class RoleController {
    constructor(private readonly roleService:RoleService){}
    
    @UseGuards(SuperAdminGuard)
    @ApiOperation({summary:"Create Role"})
    @Post('create')
    async createRole(@Body() createRoleDto:CreateRoleDto):Promise<Role>{
        return this.roleService.createRole(createRoleDto)    
    }
    
    @UseGuards(SuperAdminGuard)
    @ApiOperation({summary:"Get All Roles"})
    @ApiResponse({status:200, description:"List of Roles", type:[Role]})
    @Get('all')
    async findAllCompany():Promise<Role[]>{
        return this.roleService.findAllRoles()
    }
    
    @UseGuards(SuperAdminGuard)
    @ApiOperation({summary:"Get Role By ID"})
    @ApiResponse({status:200, description:"List of Role", type:[Role]})
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<Role>{
        return this.roleService.findById(+id)
    }
    
    @UseGuards(SuperAdminGuard)
    @ApiOperation({summary:"Delete Role"})
    @ApiResponse({status:200, description:"Success", type:[Role]})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.roleService.deleteById(+id)
    }
    
    @UseGuards(SuperAdminGuard)
    @ApiOperation({summary:"Update Role"})
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateRoleDto:UpdateRoleDto){
        return this.roleService.updateById(+id,updateRoleDto)
    }
}
