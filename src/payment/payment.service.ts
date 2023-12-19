import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { CreatePaymentCardDto } from './dto/create-payment-card.dto';
import { Payment } from './models/payment.model';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Customer } from './../customer/models/customer.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Course } from './../course/models/course.model';


@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment) private paymentRepo:typeof Payment, private readonly jwtService:JwtService){}

    async createPayment(createPaymentCardDto:CreatePaymentCardDto, req:Request): Promise<Payment>{
        const refresh_token = req['cookies'].refresh_token;
        const admin: Partial<Customer> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})

        const {amount} = createPaymentCardDto

        const ishaveuser = await Customer.findOne({where:{id:admin.id}})
        const ishavecourse = await Course.findOne({where:{id:createPaymentCardDto.course_id}})

        if(ishavecourse.payment != amount) throw new BadRequestException("Iltimos kursni puli qancha bo'lsa shuncha to'lang") 


        if(!ishaveuser){
          throw new BadRequestException({message:"Kechirasiz bunday IDli customer yoq"})
        }
    
        if(!ishavecourse){
          throw new BadRequestException({message:"Kechirasiz bunday IDli Order mavjud emas"})
        }

        const user_id = admin.id
        await Customer.update({is_payment:true}, {where:{id:ishaveuser.id}})
        const payment = await this.paymentRepo.create({...createPaymentCardDto, user_id});
        return payment
    }

    async findAllPayments():Promise<Payment[]>{
        return  this.paymentRepo.findAll()
    }

    async findById(req:Request):Promise<Payment>{
      const refresh_token = req['cookies'].refresh_token;
      const admin: Partial<Customer> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})

      const isHaveUser = await Customer.findOne({where:{id:admin.id}})

      if(!isHaveUser){
        throw new BadRequestException({message:"Kechirasiz bunday IDli customer yoq"})
      }
      const result = await this.paymentRepo.findOne({where:{user_id:admin.id}, include:{all:true}})
        return result
    }
}


