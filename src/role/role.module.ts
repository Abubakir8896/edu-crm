import { SequelizeModule} from '@nestjs/sequelize';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './model/role.model';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Role]),
  JwtModule.register({})],
controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}