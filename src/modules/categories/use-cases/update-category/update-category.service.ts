import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { UpdateCategoryInput } from '../../inputs/update-category.input';
import { CategoriesRepository } from '../../repositories/implementations/categories.repository';
import { CreateCategorySlug } from '../../utils/create-slug';

@Injectable()
export class UpdateCategoryService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly createSlug: CreateCategorySlug,
  ) {}

  async execute(category: UpdateCategoryInput) {
    validateObjectId(category._id);

    const categoryExists = await this.categoriesRepository.findById(
      category._id,
    );

    if (!categoryExists) {
      throw new HttpException('Category does not exists', HttpStatus.NOT_FOUND);
    }

    if (category.name) {
      const categoryNameAlreadyExists = await this.categoriesRepository.findByName(
        category.name,
      );

      if (
        categoryNameAlreadyExists &&
        String(categoryNameAlreadyExists._id) !== category._id
      ) {
        throw new HttpException('Category already exists', HttpStatus.CONFLICT);
      }
    }

    category.name &&
      Object.assign(category, {
        slug: await this.createSlug.create(category.name),
      });

    Object.assign(category, { updated_at: new Date() });

    const updatedCategory = await this.categoriesRepository.update(
      category._id,
      category,
    );

    return updatedCategory;
  }
}
