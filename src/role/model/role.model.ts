import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany} from 'sequelize-typescript'
import { Admin } from '../../admin/models/admin.model';

interface RoleAttr{
name:string;
}

@Table({tableName: 'role'})
export class Role extends Model<Role, RoleAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"CREATER", description:"Adminning roli"})
    @Column({
        type: DataType.STRING
    })
    name: string;

    @HasMany(() => Admin)
    admins: Admin[]
}
