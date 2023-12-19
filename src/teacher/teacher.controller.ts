import { Controller, Get, Post, Body,Param,Res, UseGuards, HttpCode, Delete,Put, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response, Response } from 'express';
import { TeacherService } from './teacher.service';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { LoginDto } from './dto/teacher-login.dto';
import { Admin } from '../admin/models/admin.model';
import { Teacher } from './models/customer.model';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdatePasswordTeacherDto } from './dto/UpdatePasswordCustomer.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AdminGuard } from '../guards/Admin.guard';
import { TeacherGuard } from '../guards/Teacher.guard';
import { TeacherAndAdmin } from '../guards/TeacherAndAdmin.guard';

@ApiTags("Teacher")
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({summary: 'register Teacher'})
  @UseGuards(AdminGuard)
  @ApiResponse({status: 201, type: Teacher})
  @Post('signup')
  async registration(@Body() createTeacherDto: CreateTeacherDto,
  @Res({passthrough: true}) res: Response){
    return this.teacherService.registration(createTeacherDto, res)
  }

    //-------------------------------------------------

  @ApiOperation({summary:"Activate Teacher"})
  @Get('activate/:link')
  activate(@Param('link') link:string){
    return this.teacherService.activate(link);
  };
    
  //----------------------------------------------------

  @ApiOperation({summary:'logout Teacher'})
  @UseGuards(TeacherGuard)
  @ApiResponse({status:200, type:Teacher})
  @Post('logout')
  logout(@CookieGetter('refresh_token') refreshToken:string,
  @Res({passthrough:true}) res:Response,
  ){return this.teacherService.logout(refreshToken,res)}
  
//-------------------------------------------------------

  @ApiOperation({summary:"Activate token with refresh"})
  @Post(":id/refresh")
  refresh(
    @Param('id') id:string,
    @CookieGetter('refresh_token') refreshToken:string,
    @Res({passthrough:true}) res:Response
  ){
    return this.teacherService.refreshToken(+id, refreshToken, res);
  }


  //----------------------------------------------------------

  @ApiOperation({summary:"Teacher Logout"})
  @Post('signin')
    login(
        @Body() loginDto:LoginDto,
        @Res({passthrough:true}) res:Response
    ){
        return this.teacherService.login(loginDto,res)
    }

    //----------------------------------------------------------

    @ApiOperation({summary:"Get One Teacher"})
    @UseGuards(TeacherAndAdmin)
    @ApiResponse({status:200, description:"List of Teacher", type:[Teacher]})
    @Get('one/:id')
    async getOneTeacher(@Param('id') id:string):Promise<Teacher>{
      return this.teacherService.findById(+id);
    }

    //-----------------------------------------------------------
    @ApiOperation({summary: 'Update Customer by ID'})
    @UseGuards(TeacherAndAdmin)
    @ApiResponse({status: 200, type: Admin})
    @Put('update')
    updateAdminById (@Body() updateTeacherDto: UpdateTeacherDto, @Req() req: Request,) {
      return this.teacherService.updateAdminById(updateTeacherDto, req)
    }

    @ApiOperation({summary: 'CHANGE PASSWORD ADMIN '})
    @UseGuards(TeacherGuard)
    @ApiResponse({status: 200, description: "True if UPDATED!"})
    @Put('change-password')
    changePassword (
      @Body() updatePasswordTeacherDto: UpdatePasswordTeacherDto,
      @Req() req: Request,
      ) {
      return this.teacherService.changePassword(updatePasswordTeacherDto, req);
    }

    @ApiOperation({summary:"Delete Admin"})
    @ApiResponse({status:200, description:"Success"})
    @UseGuards(AdminGuard)
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.teacherService.deleteById(+id)
    }
}

