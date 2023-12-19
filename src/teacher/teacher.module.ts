import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {JwtModule} from '@nestjs/jwt'
import { MailModule } from '../mail/mail.module';
import { Teacher } from './models/customer.model';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';


@Module({
  imports:[SequelizeModule.forFeature([Teacher]), 
  JwtModule.register({}),
  MailModule],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
