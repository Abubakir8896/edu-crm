import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany} from 'sequelize-typescript'

interface LessonAttr{
    theme:string;
    homework:string;
    file:string
    end_time:Date
}

@Table({tableName: 'lesson'})
export class Lesson extends Model<Lesson, LessonAttr>{
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
    theme: string;


    @ApiProperty({example:"CREATER", description:"Adminning roli"})
    @Column({
        type: DataType.STRING
    })
    homework: string;


    @ApiProperty({example:"CREATER", description:"Adminning roli"})
    @Column({
        type: DataType.STRING
    })
    file: string;

    @ApiProperty({example:"CREATER", description:"Adminning roli"})
    @Column({
        type: DataType.DATE
    })
    end_time: Date;
}
