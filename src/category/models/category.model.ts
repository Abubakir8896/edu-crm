import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany} from 'sequelize-typescript'
import { Course } from '../../course/models/course.model';

interface CategoryAttr{
name:string;
description:string
}
@Table({tableName: 'category'})
export class Category extends Model<Category, CategoryAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Flutter", description:"Categoryni nomi"})
    @Column({
        type: DataType.STRING
    })
    name: string;

    @HasMany(() => Course)
    course: Course[]
}
