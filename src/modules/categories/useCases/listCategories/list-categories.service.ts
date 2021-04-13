import { Injectable } from '@nestjs/common';
import { ListCategoriesDTO } from '../../dtos/list-categories.dto';
import { ListCategoriesInput } from '../../inputs/list-categories.input';
import { CategoriesRepository } from '../../repositories/implementations/categories.repository';

@Injectable()
class ListCategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute({
    page,
    limit,
  }: ListCategoriesInput): Promise<ListCategoriesDTO> {
    const categories = await this.categoriesRepository.listAll(page, limit);

    const data = Object.assign(categories, { categories: categories.docs });
    delete data.docs;

    return data as ListCategoriesDTO;
  }
}

export { ListCategoriesService };
