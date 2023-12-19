import { Controller, Get, Post, Body,Param,Res, UseGuards, HttpCode, Delete,Put, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response, Response } from 'express';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './models/customer.model';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { FindCustomerDto } from './dto/find-customer.dto';
import { LoginDto } from './dto/customer-login.dto';
import { Admin } from './../admin/models/admin.model';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdatePasswordCustomerDto } from './dto/UpdatePasswordCustomer.dto';
import { AdminGuard } from '../guards/Admin.guard';
import { StudentGuard } from './../guards/Student.guard';

@ApiTags("Student")
@Controller('student')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({summary: 'Register Student'})
  @ApiResponse({status: 201, type: Customer})
  @UseGuards(AdminGuard)
  @Post('signup')
  async registration(@Body() createCustoomerDto: CreateCustomerDto,
  @Res({passthrough: true}) res: Response){
    return this.customerService.registration(createCustoomerDto, res)
  }

    //-------------------------------------------------

  @ApiOperation({summary:"Activate Student"})
  @Get('activate/:link')
  activate(@Param('link') link:string){
    return this.customerService.activate(link);
  };
    
  //----------------------------------------------------

  @ApiOperation({summary:'logout Student'})
  @ApiResponse({status:200, type:Customer})
  @UseGuards(StudentGuard)
  @Post('logout')
  logout(@CookieGetter('refresh_token') refreshToken:string,
  @Res({passthrough:true}) res:Response,
  ){return this.customerService.logout(refreshToken,res)}
  
//-------------------------------------------------------

  @ApiOperation({summary:"Activate token with refresh"})
  @Post(":id/refresh")
  refresh(
    @Param('id') id:string,
    @CookieGetter('refresh_token') refreshToken:string,
    @Res({passthrough:true}) res:Response
  ){
    return this.customerService.refreshToken(+id, refreshToken, res);
  }

  //---------------------------------------------------------

  @ApiOperation({summary:"Find Student"})
  @UseGuards(AdminGuard)
  @Post("find")
  findAll(@Body() findUserDto: FindCustomerDto){
    return this.customerService.findAll
    (findUserDto)
  }

  //----------------------------------------------------------

  @ApiOperation({summary:"Student Logout"})
  @Post('signin')
    login(
        @Body() loginDto:LoginDto,
        @Res({passthrough:true}) res:Response
    ){
        return this.customerService.login(loginDto,res)
    }

    //---------------------------------------------------------

    @ApiOperation({summary:"Get All Student"})
    @UseGuards(AdminGuard)
    @ApiResponse({status:200, description:"List od Student", type:[Customer]})
    @Get('all')
    async findAllCompany():Promise<Customer[]>{
        return this.customerService.findAllCustomers()
    }

    //----------------------------------------------------------

    @ApiOperation({summary:"Get One Student"})
    @UseGuards(StudentGuard)
    @ApiResponse({status:200, description:"List of Student", type:[Customer]})
    @Get('one/:id')
    async getOneCustomer(@Param('id') id:string):Promise<Customer>{
      return this.customerService.findById(+id);
    }
    
    //-----------------------------------------------------------
    @ApiOperation({summary: 'Update Student by ID'})
    @UseGuards(StudentGuard)
    @ApiResponse({status: 200, type: Admin})
    @Put('update')
    updateAdminById (@Body() updateCustomerDto: UpdateCustomerDto, @Req() req: Request,) {
      return this.customerService.updateAdminById(updateCustomerDto, req)
    }
    
    @ApiOperation({summary: 'CHANGE PASSWORD ADMIN '})
    @UseGuards(StudentGuard)
    @ApiResponse({status: 200, description: "True if UPDATED!"})
    @Put('change-password')
    changePassword (
      @Body() updatePasswordCustomerDto: UpdatePasswordCustomerDto,
      @Req() req: Request,
      ) {
      return this.customerService.changePassword(updatePasswordCustomerDto, req);
    }

    @ApiOperation({summary:"Delete Student"})
    @UseGuards(AdminGuard)
    @ApiResponse({status:200, description:"Success"})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.customerService.deleteById(+id)
    }
}

