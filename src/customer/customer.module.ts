import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {JwtModule} from '@nestjs/jwt'
import { MailModule } from './../mail/mail.module';
import { Customer } from './models/customer.model';


@Module({
  imports:[SequelizeModule.forFeature([Customer]), 
  JwtModule.register({}),
  MailModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
