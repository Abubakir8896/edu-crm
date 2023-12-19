import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany} from 'sequelize-typescript'
import { Group } from '../../group/model/group.model'

interface TeacherAttr{
    full_name:string
    username: string
    hashed_password: string
    email: string
    phone: string
    is_active:boolean
    adress:string
    hashed_refresh_token:string,
    activation_link:string,
    role:string
}

@Table({tableName: 'teacher'})
export class Teacher extends Model<Teacher, TeacherAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Eshmatov", description:"Foydalanuvchining Familiyasi"})
    @Column({
        type: DataType.STRING
    })
    full_name: string

    @ApiProperty({example:"Eshmat77", description:"Foydalanuvchining username"})
    @Column({
        type: DataType.STRING,
        unique:true
    })
    username: string

    @ApiProperty({example:"^%$#EWRTYUIOKJHGFDSERTYU#$%", description:"Foydalanuvchining Hashlangan passwordi"})
    @Column({
        type: DataType.STRING
    })
    hashed_password: string

    @ApiProperty({example:"Abubakir.zikirov8896@gmail.com", description:"Foydalanuvchining emaili"})
    @Column({
        type: DataType.STRING,
    })
    email: string

    @ApiProperty({example:"+998931208896", description:"Foydalanuvchining Telefon raqami"})
    @Column({
        type: DataType.STRING,
    })
    phone: string


    @ApiProperty({example:"true", description:"Foydalanuvchi tasdiqlangan xolati"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false
    })
    is_active: boolean
    
    @ApiProperty({example:"token", description:"hashlandan tokeni"})
    @Column({
        type: DataType.STRING
    })
    hashed_refresh_token: string
    
    @Column({
        type: DataType.STRING,
    })
    activation_link:string


    @ApiProperty({example:"Shamsobod.MFY Boxor 4 uy", description:""})
    @Column({
        type: DataType.STRING
    })
    addres:string

    @Column({
        type: DataType.STRING,
        defaultValue:'teacher'
    })
    role:string

    @HasMany(() => Group)
    groups: Group[]
}

