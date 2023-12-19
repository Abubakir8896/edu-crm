import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript'
import { Group } from './../../group/model/group.model';
import { Payment } from './../../payment/models/payment.model';

interface CustomerAttr{
    full_name:string;
    username:string;
    email:string;
    password:string;
    phone_number:string;
    addres:string;
    gender:number;
    group_id:number;
    hashed_token:string;
    is_payment:string;
    is_active:boolean;
    activation_link:string
    role:string
}

@Table({tableName: 'student'})
export class Customer extends Model<Customer, CustomerAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Eshmat", description:"Foydalanuvchining ismi"})
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
    phone_number: string

    @ApiProperty({example:"true", description:"Foydalanuvchi tasdiqlangan xolati"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue:true
    })
    is_active: boolean

    @ApiProperty({example:"true", description:"Foydalanuvchi tasdiqlangan xolati"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false
    })
    is_payment: boolean
    
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

    @ApiProperty({example:"Shamsobod.MFY Boxor 4 uy", description:""})
    @Column({
        type: DataType.STRING,
        defaultValue:'student'
    })
    role:string

    @ApiProperty({example:"Shamsobod.MFY Boxor 4 uy", description:""})
    @Column({
        type: DataType.INTEGER
    })
    gender:number

    @ForeignKey(()  => Group)
    @Column({type:DataType.INTEGER})
    group_id:number

    @BelongsTo(() => Group)
    group:Group

    @HasMany(() => Payment)
    payments: Payment[]
}

