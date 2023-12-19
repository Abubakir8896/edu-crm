import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript'
import { Group } from '../../group/model/group.model';
import { Category } from './../../category/models/category.model';
import { Payment } from './../../payment/models/payment.model';
import { Customer } from './../../customer/models/customer.model';

interface SheduleAttr{
student_id:number;
group_id:number;
status:boolean;
date:Date
}
@Table({tableName: 'schedule'})
export class Schedule extends Model<Schedule, SheduleAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Koylak", description:"Categoryni nomi"})
    @Column({
        type: DataType.BOOLEAN
    })
    status: boolean;

    @ApiProperty({example:"Koylak", description:"Categoryni nomi"})
    @Column({
        type: DataType.DATE
    })
    date: Date;

    @ForeignKey(()  => Customer)
    @Column({type:DataType.INTEGER})
    student_id:number

    @BelongsTo(() => Customer)
    student:Customer

    @ForeignKey(()  => Group)
    @Column({type:DataType.INTEGER})
    group_id:number

    @BelongsTo(() => Group)
    group:Group
}
