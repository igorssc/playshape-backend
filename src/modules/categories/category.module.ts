import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../accounts/user.module';
import { Category, CategorySchema } from './entities/category.schema';
import { CategoriesRepository } from './repositories/implementations/categories.repository';
import { CreateCategoryResolver } from './useCases/createCategory/create-category.resolver';
import { CreateCategoriesService } from './useCases/createCategory/create-category.service';
import { ListCategoriesResolver } from './useCases/listCategories/list-categories.resolver';
import { ListCategoriesService } from './useCases/listCategories/list-categories.service';
import { UpdateCategoryResolver } from './useCases/updateCategory/update-category.resolver';
import { UpdateCategoryService } from './useCases/updateCategory/update-category.service';

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
    ListCategoriesResolver,
    ListCategoriesService,
    UpdateCategoryResolver,
    UpdateCategoryService,
  ],
})
export class CategoryModule {}
