import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ListCategoryDTO } from '../../dtos/list-category.dto';
import { UpdateCategoryInputTypeCategory } from '../../inputs/update-category.input';
import { CategoriesRepository } from '../../repositories/implementations/categories.repository';

@Injectable()
class UpdateCategoryService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(
    category: UpdateCategoryInputTypeCategory,
  ): Promise<ListCategoryDTO> {
    const categoryExists = await this.categoriesRepository.findById(
      category._id,
    );

    if (!categoryExists) {
      throw new HttpException(
        'Category does not exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (category.name) {
      const categoryNameAlreadyExists = await this.categoriesRepository.findByName(
        category.name,
      );

      if (
        categoryNameAlreadyExists &&
        String(categoryNameAlreadyExists._id) !== category._id
      ) {
        throw new HttpException(
          'Category already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const updatedCategory = await this.categoriesRepository.update(
      category._id,
      category,
    );

    return updatedCategory as ListCategoryDTO;
  }
}

export { UpdateCategoryService };
