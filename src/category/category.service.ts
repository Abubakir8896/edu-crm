import { Injectable, BadRequestException } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { CreatecategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category) private roleRepo:typeof Category){}

    async createCategory(createcategoryDto:CreatecategoryDto): Promise<Category>{
        const {name} = createcategoryDto
        const Isname = await this.roleRepo.findOne({where:{name:name}})
        
        if(Isname){
            throw new BadRequestException("Bunday categoriya mavjud")
        }
        const category = await this.roleRepo.create(createcategoryDto);
        return category
    }

    async findAllCategory():Promise<Category[]>{
        return  this.roleRepo.findAll()
    }

    async findById(id:number):Promise<Category>{
        return this.roleRepo.findByPk(id,{include:{all:true}})
    }

    async deleteById(id:number):Promise<string>{
        const category = await  this.roleRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateCategoryDto:UpdateCategoryDto){
        const category = await this.roleRepo.update(updateCategoryDto,{where: {id},returning:true});
        return category[1][0]
    }
}


