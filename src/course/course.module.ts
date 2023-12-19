import { SequelizeModule} from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Course } from './models/course.model';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports:[SequelizeModule.forFeature([Course]),
JwtModule.register({})],
controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}