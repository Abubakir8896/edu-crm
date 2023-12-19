import { Module } from '@nestjs/common';
import { FileModule } from '../files/file.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Lesson } from './model/lesson.model';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';


@Module({
  imports:[SequelizeModule.forFeature([Lesson]),JwtModule.register({}),FileModule],
  controllers:[LessonController],
  providers: [LessonService],
  exports:[LessonService]
})
export class LessonModule {}
