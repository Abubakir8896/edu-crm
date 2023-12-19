import { SequelizeModule} from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Schedule } from './models/schedule.model';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports:[SequelizeModule.forFeature([Schedule]),
JwtModule.register({})],
controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}