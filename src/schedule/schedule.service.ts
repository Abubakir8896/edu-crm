import { Injectable, BadRequestException } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Schedule } from './models/schedule.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
    constructor(@InjectModel(Schedule) private scheduleRepo:typeof Schedule){}

    async createCategory(createScheduleDto:CreateScheduleDto): Promise<Schedule>{
        const category = await this.scheduleRepo.create(createScheduleDto);
        return category
    }

    async findAllCategory():Promise<Schedule[]>{
        return  this.scheduleRepo.findAll()
    }

    async findById(id:number):Promise<Schedule>{
        return this.scheduleRepo.findByPk(id,{include:{all:true}})
    }

    async deleteById(id:number):Promise<string>{
        const category = await  this.scheduleRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateScheduleDto:UpdateScheduleDto){
        const category = await this.scheduleRepo.update(updateScheduleDto,{where: {id},returning:true});
        return category[1][0]
    }
}