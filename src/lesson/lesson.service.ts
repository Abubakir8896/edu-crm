import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { CreateLessonDto } from './dto/create-lesson.dto';
import { FileService } from '../files/file.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './model/lesson.model';

@Injectable()
export class LessonService {
    constructor(@InjectModel(Lesson) private lessonRepo:typeof Lesson,
    private readonly fileService: FileService){}

    async create(createLessonDto: CreateLessonDto, file:any) {
      const fileName = await this.fileService.createFile(file)
      const product = await this.lessonRepo.create({...createLessonDto, file:fileName});
      return product
    }

    async findAllRoles():Promise<Lesson[]>{
        return  this.lessonRepo.findAll()
    }

    async findById(id:number):Promise<Lesson>{
        return this.lessonRepo.findByPk(id,{include:{all:true}})
    }

    async deleteById(id:number):Promise<string>{
        const role = await  this.lessonRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateLessonDto:UpdateLessonDto){
        const role = await this.lessonRepo.update(updateLessonDto,{where: {id},returning:true});
        return role[1][0]
    }
}


