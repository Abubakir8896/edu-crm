import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Role } from './model/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role) private roleRepo:typeof Role){}

    async createRole(createRoleDto:CreateRoleDto): Promise<Role>{
        const role = await this.roleRepo.create(createRoleDto);
        return role
    }

    async findAllRoles():Promise<Role[]>{
        return  this.roleRepo.findAll()
    }

    async findById(id:number):Promise<Role>{
        return this.roleRepo.findByPk(id,{include:{all:true}})
    }

    async deleteById(id:number):Promise<string>{
        const role = await  this.roleRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateRoleDto:UpdateRoleDto){
        const role = await this.roleRepo.update(updateRoleDto,{where: {id},returning:true});
        return role[1][0]
    }
}


