import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { RoleModule } from './role/role.module';
import { TeacherModule } from './teacher/teacher.module';
import { LessonModule } from './lesson/lesson.module';
import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';
import { GroupModule } from './group/group.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentModule } from './payment/payment.module';
import { ScheduleModule } from './schedule/schedule.module';
@Module({
  imports: [
ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      models: [],
      autoLoadModels: true,
    }),
    AdminModule,
    RoleModule,
    TeacherModule,
    LessonModule,
    CategoryModule,
    CourseModule,
    GroupModule,
    CustomerModule,
    PaymentModule,
    ScheduleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
