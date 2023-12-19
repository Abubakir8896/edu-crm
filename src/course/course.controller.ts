import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/Admin.guard';
import { SuperAdminGuard } from '../guards/superAdmin.guard';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './models/course.model';

@ApiTags("course")
@Controller('course')
export class CourseController {
    constructor(private readonly courseService:CourseService){}

    @ApiOperation({summary:"Create course"})
    @UseGuards(AdminGuard)
    @Post('create')
    async createRole(@Body() createCourseDto:CreateCourseDto):Promise<Course>{
        return this.courseService.createCategory(createCourseDto)    
    }

    @ApiOperation({summary:"Get All Course"})
    @ApiResponse({status:200, description:"List of Course", type:[Course]})
    @Get('all')
    async findAllCompany():Promise<Course[]>{
        return this.courseService.findAllCategory()
    }

    @ApiOperation({summary:"Get Course by id"})
    @ApiResponse({status:200, description:"List of Course", type:[Course]})
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<Course>{
        return this.courseService.findById(+id)
    }

    @UseGuards(AdminGuard)
    @ApiOperation({summary:"Delete Course"})
    @ApiResponse({status:200, description:"Success"})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.courseService.deleteById(+id)
    }
    
    @UseGuards(AdminGuard)
    @ApiOperation({summary:"Update Course"})
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateCourseDto:UpdateCourseDto){
        return this.courseService.updateById(+id,updateCourseDto)
    }
}
