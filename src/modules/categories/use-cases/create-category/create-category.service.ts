import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from '../../inputs/create-category.input';
import { CategoriesRepository } from '../../repositories/implementations/categories.repository';

@Injectable()
export class CreateCategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute({ name, description }: CreateCategoryInput) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const createdCategory = await this.categoriesRepository.create({
      name,
      description,
    });
    return createdCategory;
  }
}
