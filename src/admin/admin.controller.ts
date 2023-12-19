import { Controller, Get, Post, Body,Param,Res, UseGuards, HttpCode, Delete,Put, Req} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response, Response } from 'express';
 import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './models/admin.model';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SuperAdminGuard } from '../guards/superAdmin.guard';

@ApiTags("Admin")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(SuperAdminGuard)
  @ApiOperation({summary: 'register Admin'})
  @ApiResponse({status: 201, type: Admin})
  @Post('signup')
  registration(@Body() createCustoomerDto: CreateAdminDto,
  @Res({passthrough: true}) res: Response){
    return this.adminService.registration(createCustoomerDto, res)
  }

  @ApiOperation({summary:"Activate Admin"})
  @ApiResponse({status:200, description:"Success Activated"})
  @Get('activate/:link')
  activate(@Param('link') link:string){
    return this.adminService.activate(link);
  };
    
  @ApiOperation({summary:'logout Admin'})
  @ApiResponse({status:200, type:Admin})
  @Post('logout')
  logout(@CookieGetter('refresh_token') refreshToken:string,
  @Res({passthrough:true}) res:Response,
  ){return this.adminService.logout(refreshToken,res)}
  
  @ApiOperation({summary:"Refresh Token"})
  @Post(":id/refresh")
  refresh(
    @Param('id') id:string,
    @CookieGetter('refresh_token') refreshToken:string,
    @Res({passthrough:true}) res:Response
  ){
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({summary:"Login Admin"})
  @Post('signin')
    login(
        @Body() loginDto:AdminLoginDto,
        @Res({passthrough:true}) res:Response
    ){
        return this.adminService.login(loginDto,res)
    }

    @UseGuards(SuperAdminGuard)
    @ApiOperation({summary:"Get All Admins"})
    @ApiResponse({status:200, description:"List of Admins", type:[Admin]})
    @Get('all')
    async findAllCompany():Promise<Admin[]>{
        return this.adminService.GetAllAdmins()
    }

    @UseGuards(SuperAdminGuard)
    @ApiOperation({summary: 'Update admin by ID'})
    @ApiResponse({status: 200, type: Admin})
    @Put('update')
    updateAdminById (@Body() updateAdminDto: UpdateAdminDto, @Req() req: Request,) {
      return this.adminService.updateAdminById(updateAdminDto, req)
    }

    @UseGuards(SuperAdminGuard)
    @ApiOperation({summary:"Get One Admin"})
    @ApiResponse({status:200, description:"List of Customer", type:[Admin]})
    @UseGuards(CreateAdminDto)
    @Get('one/:id')
    async getOneCustomer(@Param('id') id:string):Promise<Admin>{
      return this.adminService.findById(+id);
    }

    @ApiOperation({summary: 'CHANGE PASSWORD ADMIN '})
    @ApiResponse({status: 200, description: "True if UPDATED!"})
    @UseGuards(CreateAdminDto)
    @Put('change-password')
    changePassword (
      @Body() updatePasswordDto: UpdatePasswordDto,
      @Req() req: Request,
      ) {
      return this.adminService.changePassword(updatePasswordDto, req);
    }

  @UseGuards(SuperAdminGuard)

    @ApiOperation({summary:"Delete Admin"})
    @ApiResponse({status:200, description:"Success"})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.adminService.deleteById(+id)
    }
}

