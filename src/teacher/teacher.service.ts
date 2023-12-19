import { Injectable, HttpStatus, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {JwtService} from '@nestjs/jwt'
import { Response } from 'express';
import {BadRequestException, ForbiddenException, HttpException, UnauthorizedException} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt'
import {v4} from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { Op } from 'sequelize';
import { LoginDto } from './dto/teacher-login.dto';
import { CanActivate } from '@nestjs/common';
import { Teacher } from './models/customer.model';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdatePasswordTeacherDto } from './dto/UpdatePasswordCustomer.dto';


@Injectable()
export class TeacherService 
{
  constructor(
    @InjectModel(Teacher) private readonly teacherRepo: typeof Teacher,
    private readonly jwtService:JwtService,
    private readonly mailService: MailService){}
    

    //Token generatsiya qilish

    async getTokens(user:Teacher){
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

    async registration(createTeacherDto:CreateTeacherDto, res:Response){
      const user = await this.teacherRepo.findOne({where:{username:createTeacherDto.username}})

      if(user) throw new BadRequestException("Username already exist!")

      if(createTeacherDto.password != createTeacherDto.confirm_password) throw new BadRequestException("Password is not match")

      const hashed_password = await bcrypt.hash(createTeacherDto.password, 7)

      
      const newCustomer = await this.teacherRepo.create({
        ...createTeacherDto,
        hashed_password:hashed_password,
      });

      const tokens = await this.getTokens(newCustomer)

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

      const uniqueKey:string = v4()

      const updatedCustomer = await this.teacherRepo.update({
        hashed_refresh_token:hashed_refresh_token,
        activation_link:uniqueKey,
      },{where:{id:newCustomer.id}, returning:true});

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge:15*24*60*60*1000,
        httpOnly:true
      });

      try {
        await this.mailService.sendTeacherConfirmation(updatedCustomer[1][0]);
      } catch (error) {
        console.log(error);
      }

      const response = {
        message:"Teacher Registered",
        customer:updatedCustomer[1][0],
        tokens,
      }
      return response
    
    }
  

    //Tasdiqlash qismi

    async activate(link:string){
    console.log(link);
    
    if(!link) throw new BadRequestException('Activation link not found')

    const updatedCustomer = await this.teacherRepo.update({is_active:true}, {where:{activation_link: link, is_active:false}, returning:true});
      

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

    const updatedUser=await this.teacherRepo.update({hashed_refresh_token:null}, {where:{id:CustomerData.id}, returning: true});

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

    const user = await this.teacherRepo.findOne({where:{id:user_id}});
    if(!user || !user.hashed_refresh_token){
      throw new BadRequestException('user not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, user.hashed_refresh_token)

    if(!tokenMatch){
      throw new ForbiddenException('Forbidden')
    }

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const updatedUser = await this.teacherRepo.update({hashed_refresh_token:hashed_refresh_token}, {where:{id:user.id}, returning: true},)

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


  //Customerlar uchun login qilish qismi

  async login(loginDto:LoginDto,res:Response){
    const {username,password} = loginDto

    const customer = await this.teacherRepo.findOne({where:{username}})
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

    const updateUser = await this.teacherRepo.update(
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
async findAllCustomers():Promise<Teacher[]>{
  return  this.teacherRepo.findAll()
}


//Customerlar o'zini profiini ko'rish qismi
async findById(id:number):Promise<Teacher>{
  return this.teacherRepo.findByPk(id,{include:{all:true}})
}

async updateAdminById (
  updateTeacherDto: UpdateTeacherDto,req: Request) {
  const refresh_token = req['cookies'].refresh_token;
  const customer: Partial<Teacher> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})
  const updatedAdmin = await this.teacherRepo.update({...updateTeacherDto},{where: {id:customer.id}, returning: true} )
  return updatedAdmin[1][0]
}

async changePassword (
  updatePasswordTeacherDto: UpdatePasswordTeacherDto,
  req: Request,
  ) {
    try {
      const refresh_token = req['cookies'].refresh_token;
      const admin: Partial<Teacher> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})
      const adminId = admin.id
      const findAdmin = await this.teacherRepo.findOne({where:{id: adminId}});
      const isMatchPass = await bcrypt.compare(updatePasswordTeacherDto.old_password, findAdmin.hashed_password)
      if (!isMatchPass) throw new UnauthorizedException('Old password not match');
      if (updatePasswordTeacherDto.new_password !== updatePasswordTeacherDto.confirm_password) {
        throw new BadRequestException("New passwords do not match");
      }
      const new_hashed_password = await bcrypt.hash(updatePasswordTeacherDto.new_password, 12);
      await this.teacherRepo.update({hashed_password: new_hashed_password},{where: {id: adminId}})
      return true;
    } catch (error) {
      return false;
    }
}

async deleteById(id:number):Promise<string>{
  const customer = await  this.teacherRepo.destroy({where:{id}})
  return "Success"
}
}