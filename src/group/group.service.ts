import { Injectable, BadRequestException } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Group } from './model/group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
    constructor(@InjectModel(Group) private groupRepo:typeof Group){}

    async createCategory(createGroupDto:CreateGroupDto): Promise<Group>{
        const category = await this.groupRepo.create(createGroupDto);
        return category
    }

    async findAllCategory():Promise<Group[]>{
        return  this.groupRepo.findAll()
    }

    async findById(id:number):Promise<Group>{
        return this.groupRepo.findByPk(id,{include:{all:true}})
    }

    async deleteById(id:number):Promise<string>{
        const category = await  this.groupRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateGroupDto:UpdateGroupDto){
        const category = await this.groupRepo.update(updateGroupDto,{where: {id},returning:true});
        return category[1][0]
    }
}


