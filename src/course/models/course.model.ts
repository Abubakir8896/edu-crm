import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript'
import { Group } from '../../group/model/group.model';
import { Category } from './../../category/models/category.model';
import { Payment } from './../../payment/models/payment.model';

interface CourseAttr{
name:string;
description:string;
payment:number;
category_id:number;
is_active:boolean;
}
@Table({tableName: 'course'})
export class Course extends Model<Course, CourseAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Koylak", description:"Categoryni nomi"})
    @Column({
        type: DataType.STRING
    })
    name: string;

    @ApiProperty({example:"Koylak", description:"Categoryni nomi"})
    @Column({
        type: DataType.STRING
    })
    description: string;

    @ApiProperty({example:"Koylak", description:"Categoryni nomi"})
    @Column({
        type: DataType.INTEGER
    })
    payment: number;

    @ApiProperty({example:"Koylak", description:"Categoryni nomi"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    is_active: boolean;

    @ForeignKey(()  => Category)
    @Column({type:DataType.INTEGER})
    category_id:number

    @BelongsTo(() => Category)
    category:Category

    @HasMany(() => Group)
    groups: Group[]

    @HasMany(() => Payment)
    payments: Payment[]
}
