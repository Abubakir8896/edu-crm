import { Injectable , HttpStatus, CanActivate, ExecutionContext} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {JwtService} from '@nestjs/jwt'
import { Response } from 'express';
import { BadRequestException, ForbiddenException, HttpException, UnauthorizedException} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt'
import {v4} from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { Op } from 'sequelize';
import { Admin } from './models/admin.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Role } from '../role/model/role.model';

@Injectable()
export class AdminService
{
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService:JwtService,
    private readonly mailService: MailService){}
    
    async getTokens(user:Admin){
      const jwtPayload ={
        id:user.id,
        is_active:user.is_active,
        role_id:user.role_id
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

    async registration(createAdminDto:CreateAdminDto, res:Response){
      const user = await this.adminRepo.findOne({where:{username:createAdminDto.username}})
      const {role_id} =  createAdminDto

      const IsRole_id = await Role.findOne({where:{id:role_id}})

      if(!IsRole_id){
        throw new BadRequestException("Kechirasiz bunday role mavjud emas")
      }

      if(user) throw new BadRequestException("Username already exist!")

      if(createAdminDto.password != createAdminDto.confirm_password) throw new BadRequestException("Password is not match")

      const hashed_password = await bcrypt.hash(createAdminDto.password, 7)

      
      const newCustomer = await this.adminRepo.create({
        ...createAdminDto,
        hashed_password:hashed_password,
      });

      const tokens = await this.getTokens(newCustomer)

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

      const uniqueKey:string = v4()

      const updatedAdmin = await this.adminRepo.update({
        hashed_refresh_token:hashed_refresh_token,
        activation_link:uniqueKey,
      },{where:{id:newCustomer.id}, returning:true});

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge:15*24*60*60*1000,
        httpOnly:true
      });

      try {
        await this.mailService.sendAdminConfirmation(updatedAdmin[1][0]);
      } catch (error) {
        console.log(error);
      }

      const response = {
        message:"Admin Registered",
        customer:updatedAdmin[1][0],
        tokens,
      }
      return response
    
    }
  
    async activate(link:string){
    console.log(link);
    
    if(!link) throw new BadRequestException('Activation link not found')

    const updatedCustomer = await this.adminRepo.update({is_active:true}, {where:{activation_link: link, is_active:false}, returning:true});
      

    if(!updatedCustomer) throw new BadRequestException("Admin already exist");

      const response ={
        message:'Admin Activated successfully',
        use:updatedCustomer[1][0]
      };
      return response
  }


  async logout(refreshToken: string , res: Response){
    const CustomerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY
    });
    if(!CustomerData) throw new ForbiddenException("Customer not found")

    const updatedUser=await this.adminRepo.update({hashed_refresh_token:null}, {where:{id:CustomerData.id}, returning: true});

    res.clearCookie("refresh_token")
    const response={
      message: 'Admin logged out successfully',
      user:updatedUser[1][0],
    };
    return response
  }

  async refreshToken(user_id:number, refreshToken:string, res: Response){
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']){
      throw new BadRequestException('user not found');
    }

    const user = await this.adminRepo.findOne({where:{id:user_id}});
    if(!user || !user.hashed_refresh_token){
      throw new BadRequestException('user not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, user.hashed_refresh_token)

    if(!tokenMatch){
      throw new ForbiddenException('Forbidden')
    }

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const updatedUser = await this.adminRepo.update({hashed_refresh_token:hashed_refresh_token}, {where:{id:user.id}, returning: true},)

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

  async login(loginDto:AdminLoginDto,res:Response){
    const {username,password} = loginDto

    const customer = await this.adminRepo.findOne({where:{username}})
    if(!customer){
        throw new UnauthorizedException("Admin not registered")
    }

    if(!customer.is_active){
        throw new BadRequestException("Admin is not active")
    }
    
    const is_Match = await bcrypt.compare(password,customer.hashed_password)

    if(!is_Match){
        throw new UnauthorizedException("Username or password incorrect")
    }

    const tokens = await this.getTokens(customer)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

    const updateUser = await this.adminRepo.update(
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
  async GetAllAdmins():Promise<Admin[]>{
    return  this.adminRepo.findAll()
  }

  async updateAdminById (
    updateAdminDto: UpdateAdminDto,req: Request) {
    const refresh_token = req['cookies'].refresh_token;
    const admin: Partial<Admin> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})
    const updatedAdmin = await this.adminRepo.update({...updateAdminDto},{where: {id:admin.id}, returning: true} )
    return updatedAdmin[1][0]
  }

  async changePassword (
    updatePasswordDto: UpdatePasswordDto,
    req: Request,
    ) {
      try {
        const refresh_token = req['cookies'].refresh_token;
        const admin: Partial<Admin> = await this.jwtService.verifyAsync(refresh_token, {secret: process.env.REFRESH_TOKEN_KEY})
        const adminId = admin.id
        const findAdmin = await this.adminRepo.findOne({where:{id: adminId}});
        const isMatchPass = await bcrypt.compare(updatePasswordDto.past_password, findAdmin.hashed_password)
        if (!isMatchPass) throw new UnauthorizedException('Old password not match');
        if (updatePasswordDto.new_password !== updatePasswordDto.confirm_password) {
          throw new BadRequestException("New passwords do not match");
        }
        const new_hashed_password = await bcrypt.hash(updatePasswordDto.new_password, 12);
        await this.adminRepo.update({hashed_password: new_hashed_password},{where: {id: adminId}})
        return true;
      } catch (error) {
        return false;
      }
  }

async findById(id:number):Promise<Admin>{
  return this.adminRepo.findByPk(id,{include:{all:true}})
}

  async deleteById(id:number):Promise<string>{
    const admin = await  this.adminRepo.destroy({where:{id}})
    return "Success"
}

}