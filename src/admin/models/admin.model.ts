import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, ForeignKey, BelongsTo} from 'sequelize-typescript'
import { Role } from '../../role/model/role.model'

interface AdminAttr{
    name:string
    username: string
    hashed_password: string
    email: string
    phone: string
    is_active:boolean
    hashed_refresh_token:string,
    activation_link:string
    role_id:number
}

@Table({tableName: 'admin'})
export class Admin extends Model<Admin, AdminAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Eshmat", description:"Adminning ismi"})
    @Column({
        type:DataType.STRING
    })
    name:string

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
        allowNull:false
    })
    email: string


    @ApiProperty({example:"+998931208896", description:"Foydalanuvchining Telefon raqami"})
    @Column({
        type: DataType.STRING,
        allowNull:false
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

    @ForeignKey(()  => Role)
    @Column({type:DataType.INTEGER})
    role_id:number

    @BelongsTo(() => Role)
    role:Role
}
