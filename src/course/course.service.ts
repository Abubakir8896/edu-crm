import { Injectable, BadRequestException } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './models/course.model';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course) private courseRepo:typeof Course){}

    async createCategory(createCourseDto:CreateCourseDto): Promise<Course>{
        const category = await this.courseRepo.create(createCourseDto);
        return category
    }

    async findAllCategory():Promise<Course[]>{
        return  this.courseRepo.findAll()
    }

    async findById(id:number):Promise<Course>{
        return this.courseRepo.findByPk(id,{include:{all:true}})
    }

    async deleteById(id:number):Promise<string>{
        const category = await  this.courseRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateCourseDto:UpdateCourseDto){
        const category = await this.courseRepo.update(updateCourseDto,{where: {id},returning:true});
        return category[1][0]
    }
}


