import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../accounts/user.module';
import { Category, CategorySchema } from './entities/category.schema';
import { CategoriesRepository } from './repositories/implementations/categories.repository';
import { CreateCategoryResolver } from './use-cases/create-category/create-category.resolver';
import { CreateCategoriesService } from './use-cases/create-category/create-category.service';
import { FindCategoryResolver } from './use-cases/find-category/find-category,service';
import { FindCategoryService } from './use-cases/find-category/find-category.resolver';
import { ListCategoriesResolver } from './use-cases/list-categories/list-categories.resolver';
import { ListCategoriesService } from './use-cases/list-categories/list-categories.service';
import { UpdateCategoryResolver } from './use-cases/update-category/update-category.resolver';
import { UpdateCategoryService } from './use-cases/update-category/update-category.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [],
  providers: [
    CategoriesRepository,
    CreateCategoryResolver,
    CreateCategoriesService,
    FindCategoryResolver,
    FindCategoryService,
    ListCategoriesResolver,
    ListCategoriesService,
    UpdateCategoryResolver,
    UpdateCategoryService,
  ],
  exports: [CategoriesRepository, FindCategoryService],
})
export class CategoryModule {}
