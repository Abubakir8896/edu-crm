import { SequelizeModule} from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Group } from './model/group.model';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports:[SequelizeModule.forFeature([Group]),
  JwtModule.register({})],
controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}