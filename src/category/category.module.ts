import { SequelizeModule} from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './models/category.model';

@Module({
  imports:[SequelizeModule.forFeature([Category]),
  JwtModule.register({})],
controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}