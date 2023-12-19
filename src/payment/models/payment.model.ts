import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, ForeignKey, BelongsTo} from 'sequelize-typescript'
import { Customer } from './../../customer/models/customer.model';
import { Course } from './../../course/models/course.model';

interface PaymentAttr{
course_id:number;
amount:number;
user_id:number;
date:Date  
}

@Table({tableName: 'payment'})
export class Payment extends Model<Payment, PaymentAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"150", description:"Tolov summasi"})
    @Column({
        type: DataType.INTEGER,
    })
    amount:number 

    @ApiProperty({example:"150", description:"Tolov summasi"})
    @Column({
        type: DataType.DATE,
    })
    date: Date

    @ForeignKey(()  => Customer)
    @Column({type:DataType.INTEGER})
    user_id:number

    @BelongsTo(() => Customer)
    student:Customer

    @ForeignKey(()  => Course)
    @Column({type:DataType.INTEGER})
    course_id:number

    @BelongsTo(() => Course)
    course:Course
}
