import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript'
import { Course } from './../../course/models/course.model';
import { Teacher } from './../../teacher/models/customer.model';
import { Customer } from './../../customer/models/customer.model';

interface GroupAttr{
name:string;
description:string;
students_limit:number;
course_id:number;
teacher_id:number;
is_active:boolean
}
@Table({tableName: 'group'})
export class Group extends Model<Group, GroupAttr>{
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
    students_limit: number;

    @ForeignKey(()  => Course)
    @Column({type:DataType.INTEGER})
    course_id:number

    @BelongsTo(() => Course)
    course:Course

    @ForeignKey(()  => Teacher)
    @Column({type:DataType.INTEGER})
    teacher_id:number

    @BelongsTo(() => Teacher)
    teacher:Teacher

    @ApiProperty({example:"Koylak", description:"Categoryni nomi"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue:true
    })
    is_active: boolean;

    @HasMany(() => Customer)
    students: Customer[]
}
