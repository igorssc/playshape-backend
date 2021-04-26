import { Injectable } from '@nestjs/common';
import { createSlug } from '../../../utils/create-slug';
import { FindCategoryInput } from '../inputs/find-category.input';
import { FindCategoryService } from '../use-cases/find-category/find-category.resolver';

@Injectable()
export class CreateCategorySlug {
  constructor(private findCategoryService: FindCategoryService) {}

  async create(name: string) {
    const initialSlug = createSlug(name);

    let slug: string;
    let incrementSlug: number = 0;

    while (!slug) {
      try {
        await this.findCategoryService.execute({
          slug: initialSlug + (incrementSlug === 0 ? '' : '-' + incrementSlug),
        } as FindCategoryInput);

        ++incrementSlug;
      } catch {
        slug = initialSlug + (incrementSlug === 0 ? '' : '-' + incrementSlug);
      }
    }

    return slug;
  }
}
