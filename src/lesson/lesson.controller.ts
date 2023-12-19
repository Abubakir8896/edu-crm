import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperAdminGuard } from './../guards/superAdmin.guard';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LessonService } from './lesson.service';
import { Lesson } from './model/lesson.model';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { TeacherAndAdmin } from './../guards/TeacherAndAdmin.guard';
import { Admin } from '../admin/models/admin.model';

@ApiTags("Lesson")
@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService:LessonService){}
    
    @UseGuards(TeacherAndAdmin)
    @ApiOperation({summary: "Create Lesson"})
    @Post('create')
    @UseInterceptors(FileInterceptor("file"))
    create(@Body() createLessonDto: CreateLessonDto, @UploadedFile() file:any) {
      return this.lessonService.create(createLessonDto, file)
    }
    
    @ApiOperation({summary:"Get All Lesson"})
    @ApiResponse({status:200, description:"List of Lesson", type:[Lesson]})
    @Get('all')
    async findAllCompany():Promise<Lesson[]>{
        return this.lessonService.findAllRoles()
    }
    
    @ApiOperation({summary:"Get Lesson By ID"})
    @ApiResponse({status:200, description:"List of Lesson", type:[Lesson]})
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<Lesson>{
        return this.lessonService.findById(+id)
    }
    
    @UseGuards(Admin)
    @ApiOperation({summary:"Delete Lesson"})
    @ApiResponse({status:200, description:"Success", type:[Lesson]})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.lessonService.deleteById(+id)
    }
    
    @UseGuards(TeacherAndAdmin)
    @ApiOperation({summary:"Update Lesson"})
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateLessonDto:UpdateLessonDto){
        return this.lessonService.updateById(+id,updateLessonDto)
    }
}
