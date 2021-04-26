import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from '../../inputs/create-category.input';
import { CategoriesRepository } from '../../repositories/implementations/categories.repository';
import { CreateCategorySlug } from '../../utils/create-slug';

@Injectable()
export class CreateCategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly createSlug: CreateCategorySlug,
  ) {}

  async execute({ name, description }: CreateCategoryInput) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const slug = await this.createSlug.create(name);

    const createdCategory = await this.categoriesRepository.create({
      name,
      description,
      slug,
    } as CreateCategoryInput);
    return createdCategory;
  }
}
