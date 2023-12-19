import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentCardDto } from './dto/create-payment-card.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';
import { StudentGuard } from '../guards/Student.guard';

@ApiTags("payment")
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({summary:"Create Payment"})
  @UseGuards(StudentGuard)
  @Post("create")
  create(@Body() createPaymentCardDto: CreatePaymentCardDto, @Req() req:Request) {
    return this.paymentService.createPayment(createPaymentCardDto, req);
  }
  
  @ApiOperation({summary:"Get All History"})
  @UseGuards(StudentGuard)
  @ApiResponse({status:200, description:"List of Payment", type:[Payment]})
  @Get()
  findAll() {
    return this.paymentService.findAllPayments();
  }
  
  @ApiOperation({summary:"Get History by id"})
  @UseGuards(StudentGuard)
  @ApiResponse({status:200, description:"List of Payment", type:[Payment]})
  @Get('one')
  findOne(@Req() req:Request) {
    return this.paymentService.findById(req);
  }
}
