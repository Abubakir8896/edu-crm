import { Injectable, HttpStatus, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {JwtService} from '@nestjs/jwt'
import { Response } from 'express';
import {BadRequestException, ForbiddenException, HttpException, UnauthorizedException} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt'
import {v4} from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { Op } from 'sequelize';
import { Customer } from './models/customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';
import { LoginDto } from './dto/customer-login.dto';
import { CanActivate } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdatePasswordCustomerDto } from './dto/UpdatePasswordCustomer.dto';


@Injectable()
export class CustomerService 
{
  constructor(
    @InjectModel(Customer) private readonly customerRepo: typeof Customer,
    private readonly jwtService:JwtService,
    private readonly mailService: MailService){}
    

    //Token generatsiya qilish

    async getTokens(user:Customer){
      const jwtPayload ={
        id:user.id,
        is_active:user.is_active,
      }

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME
        }),
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME
        })
      ]);
      return {access_token: accessToken, refresh_token:refreshToken}
    };


    //Customer Registratsiyadan o'tishi

    async registration(createCustomerDto:CreateCustomerDto, res:Response){
      const user = await this.customerRepo.findOne({where:{username:createCustomerDto.username}})

      const { gender } = createCustomerDto
      let gender_id = 0

      if(gender=="Male"){
        gender_id = 1
      }
      else if(gender == "Female"){
        gender_id = 2
      }
      else{
        throw new BadRequestException("Gender is not defined")
      }

      if(user) throw new BadRequestException("Username already exist!")

      if(createCustomerDto.password != createCustomerDto.confirm_password) throw new BadRequestException("Password is not match")

      const hashed_password = await bcrypt.hash(createCustomerDto.password, 7)

      
      const newCustomer = await this.customerRepo.create({...createCustomerDto, password:hashed_password, gender:gender_id});
      console.log(newCustomer);
      

      const tokens = await this.getTokens(newCustomer)

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

      const uniqueKey:string = v4()

      const updatedCustomer = await this.customerRepo.update({
        hashed_refresh_token:hashed_refresh_token,
        activation_link:uniqueKey,
      },{where:{id:newCustomer.id}, returning:true});

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge:15*24*60*60*1000,
        httpOnly:true
      });

      try {
        await this.mailService.sendCustomerConfirmation(updatedCustomer[1][0]);
      } catch (error) {
        console.log(error);
      }

      const response = {
        message:"User Registered",
        customer:updatedCustomer[1][0],
        tokens,
      }
      return response
    
    }
  

    //Tasdiqlash qismi

    async activate(link:string){
    console.log(link);
    
    if(!link) throw new BadRequestException('Activation link not found')

    const updatedCustomer = await this.customerRepo.update({is_active:true}, {where:{activation_link: link, is_active:false}, returning:true});
      

    if(!updatedCustomer) throw new BadRequestException("Customer already exist");

      const response ={
        message:'User Activated successfully',
        use:updatedCustomer[1][0]
      };
      return response
  }

//Customer logout

  async logout(refreshToken: string , res: Response){
    const CustomerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY
    });
    if(!CustomerData) throw new ForbiddenException("Customer not found")

    const updatedUser=await this.customerRepo.update({hashed_refresh_token:null, is_active:false}, {where:{id:CustomerData.id}, returning: true});

    res.clearCookie("refresh_token")
    const response={
      message: 'Customer logged out successfully',
      user:updatedUser[1][0],
    };
    return response
  }


  //Refresh token bn access tokenni yangilash

  async refreshToken(user_id:number, refreshToken:string, res: Response){
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']){
      throw new BadRequestException('user not found');
    }

    const user = await this.customerRepo.findOne({where:{id:user_id}});
    if(!user || !user.hashed_refresh_token){
      throw new BadRequestException('user not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, user.hashed_refresh_token)

    if(!tokenMatch){
      throw new ForbiddenException('Forbidden')
    }

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const updatedUser = await this.customerRepo.update({hashed_refresh_token:hashed_refresh_token}, {where:{id:user.id}, returning: true},)

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge:15*24*60*60*1000,
      httpOnly:true
    })

    const response = {
      message:"User Refreshed",
      user:updatedUser[1][0],
      tokens,
    }
    return response
  }


  //Barcha customerlarni qidirish

  async findAll(findUserDto: FindCustomerDto){
    const where ={}
    if(findUserDto.first_name){
      where['first_name'] ={
        [Op.like]:`%${findUserDto.first_name}%`
      }
    }
    if(findUserDto.last_name){
      where['last_name'] ={
        [Op.like]:`%${findUserDto.last_name}%`
      }
  }

    const users = await Customer.findAll({where});
    if(!users){
      throw new BadRequestException('user not found')
    }
    return users
  }


  //Customerlar uchun login qilish qismi

  async login(loginDto:LoginDto,res:Response){
    const {username,password} = loginDto

    const customer = await this.customerRepo.findOne({where:{username}})
    if(!customer){
        throw new UnauthorizedException("Username not registered")
    }

    // if(!customer.is_active){
    //     throw new BadRequestException("User is not active")
    // }
    
    const is_Match = await bcrypt.compare(password,customer.hashed_password)

    if(!is_Match){
        throw new UnauthorizedException("Username or password incorrect")
    }

    const tokens = await this.getTokens(customer)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

    const updateUser = await this.customerRepo.update(
        {hashed_refresh_token:hashed_refresh_token},
        {where:{id:customer.id},returning:true}
    )

    res.cookie('refresh_token',tokens.refresh_token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true
    })
    const response = {
        message:"User logged in",
        user:updateUser[1][0],
        tokens,
    }
    return response
}

//Barcha Customerlarni olish qismi
async findAllCustomers():Promise<Customer[]>{
  return  this.customerRepo.findAll()
}


//Customerlar o'zini profiini ko'rish qismi
async findById(id:number):Promise<Customer>{
  return this.customerRepo.findByPk(id,{include:{all:true}})
}

async updateAdminById (
  updateCustomerDto: UpdateCustomerDto,req: Request) {
    const { gender } = updateCustomerDto
    let gender_id = 0

    if(gender=="Male"){
      gender_id = 1
    }
    else if(gender == "Female"){
      gender_id = 2
    }
    else{
      throw new BadRequestException("Gender is not defined")
    }
  const refresh_token = req['cookies'].refresh_token;
  const customer: Partial<Customer> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})
  const updatedAdmin = await this.customerRepo.update({...updateCustomerDto, gender:gender_id},{where: {id:customer.id}, returning: true} )
  return updatedAdmin[1][0]
}

async changePassword (
  updatePasswordCustomerDto: UpdatePasswordCustomerDto,
  req: Request,
  ) {
    try {
      const refresh_token = req['cookies'].refresh_token;
      const admin: Partial<Customer> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})
      const adminId = admin.id
      const findAdmin = await this.customerRepo.findOne({where:{id: adminId}});
      const isMatchPass = await bcrypt.compare(updatePasswordCustomerDto.old_password, findAdmin.hashed_password)
      if (!isMatchPass) throw new UnauthorizedException('Old password not match');
      if (updatePasswordCustomerDto.new_password !== updatePasswordCustomerDto.confirm_password) {
        throw new BadRequestException("New passwords do not match");
      }
      const new_hashed_password = await bcrypt.hash(updatePasswordCustomerDto.new_password, 12);
      await this.customerRepo.update({hashed_password: new_hashed_password},{where: {id: adminId}})
      return true;
    } catch (error) {
      return false;
    }
}

async deleteById(id:number):Promise<string>{
  const customer = await  this.customerRepo.destroy({where:{id}})
  return "Success"
}
}