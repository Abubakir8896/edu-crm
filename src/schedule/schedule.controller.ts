import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { Schedule } from './models/schedule.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { TeacherAndAdmin } from '../guards/TeacherAndAdmin.guard';
import { SuperAdminGuard } from './../guards/superAdmin.guard';

@ApiTags("schedule")
@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService:ScheduleService){}

    @ApiOperation({summary:"Create Schedule"})
    @UseGuards(TeacherAndAdmin)
    @Post('create')
    async createRole(@Body() createScheduleDto:CreateScheduleDto):Promise<Schedule>{
        return this.scheduleService.createCategory(createScheduleDto)    
    }
    
    @ApiOperation({summary:"Get All Schedule"})
    @UseGuards(TeacherAndAdmin)
    @ApiResponse({status:200, description:"List of Schedule", type:[Schedule]})
    @Get('all')
    async findAllCompany():Promise<Schedule[]>{
        return this.scheduleService.findAllCategory()
    }
    
    @ApiOperation({summary:"Get Schedule's by id"})
    @UseGuards(TeacherAndAdmin)
    @ApiResponse({status:200, description:"List of Schedule", type:[Schedule]})
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<Schedule>{
        return this.scheduleService.findById(+id)
    }
    
    @ApiOperation({summary:"Delete Schedule"})
    @UseGuards(SuperAdminGuard)
    @ApiResponse({status:200, description:"Success"})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.scheduleService.deleteById(+id)
    }
    
    @ApiOperation({summary:"Update Schedule"})
    @UseGuards(TeacherAndAdmin)
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateScheduleDto:UpdateScheduleDto){
        return this.scheduleService.updateById(+id,updateScheduleDto)
    }
}
