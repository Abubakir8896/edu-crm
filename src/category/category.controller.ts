import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/Admin.guard';
import { SuperAdminGuard } from '../guards/superAdmin.guard';
import { CategoryService } from './category.service';
import { CreatecategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';

@ApiTags("category")
@Controller('category')
export class CategoryController {
    constructor(private readonly CategoryService:CategoryService){}

    @ApiOperation({summary:"Create category"})
    @UseGuards(AdminGuard)
    @Post('create')
    async createRole(@Body() createcategoryDto:CreatecategoryDto):Promise<Category>{
        return this.CategoryService.createCategory(createcategoryDto)    
    }
    
    @ApiOperation({summary:"Get All Categories"})
    @ApiResponse({status:200, description:"List of Categories", type:[Category]})
    @Get('all')
    async findAllCompany():Promise<Category[]>{
        return this.CategoryService.findAllCategory()
    }
    
    @ApiOperation({summary:"Get Categories by id"})
    @ApiResponse({status:200, description:"List of Category", type:[Category]})
    @Get('one/:id')
    async findById(@Param("id") id:string):Promise<Category>{
        return this.CategoryService.findById(+id)
    }
    
    @UseGuards(AdminGuard)
    @ApiOperation({summary:"Delete Category"})
    @ApiResponse({status:200, description:"Success"})
    @Delete("/:id")
    async deleteById(@Param('id') id:string):Promise<String>{
        return this.CategoryService.deleteById(+id)
    }
    
    @UseGuards(AdminGuard)
    @ApiOperation({summary:"Update Category"})
    @Put("update/:id")
    async updateById(@Param('id') id:string, @Body() updateCategoryDto:UpdateCategoryDto){
        return this.CategoryService.updateById(+id,updateCategoryDto)
    }
}
