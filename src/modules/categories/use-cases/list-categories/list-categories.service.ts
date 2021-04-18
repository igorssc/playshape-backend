import { Injectable } from '@nestjs/common';
import { ListCategoriesInput } from '../../inputs/list-categories.input';
import { CategoriesRepository } from '../../repositories/implementations/categories.repository';

@Injectable()
export class ListCategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute({ page, limit }: ListCategoriesInput) {
    const categories = await this.categoriesRepository.listAll(page, limit);

    delete Object.assign(categories, { categories: categories.docs })['docs'];

    return categories;
  }
}
