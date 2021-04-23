import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { FindCategoryInput } from '../../inputs/find-category.input';
import { CategoriesRepository } from '../../repositories/implementations/categories.repository';

@Injectable()
export class FindCategoryService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(input: FindCategoryInput) {
    const args = Object.keys(input).length;

    if (args === 0) {
      throw new HttpException(
        'No search parameter entered',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (args > 1) {
      throw new HttpException(
        'More than one search parameter entered',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (input._id) {
      validateObjectId(input._id);
    }

    const findCategory = input._id
      ? await this.categoriesRepository.findById(input._id)
      : input.name
      ? await this.categoriesRepository.findByName(input.name)
      : undefined;

    if (!findCategory) {
      throw new HttpException('Store does not exists', HttpStatus.NOT_FOUND);
    }

    return findCategory;
  }
}
