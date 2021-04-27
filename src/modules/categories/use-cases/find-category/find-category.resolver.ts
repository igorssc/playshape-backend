import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindCategoryDTO } from '../../dtos/find-category.dto';
import { FindCategoryInput } from '../../inputs/find-category.input';
import { FindCategoryService } from './find-category.service';

@Resolver()
export class FindCategoryResolver {
  constructor(private findCategoryService: FindCategoryService) {}

  @Query(() => FindCategoryDTO)
  async findCategory(@Args('input') input: FindCategoryInput) {
    const createdCategory = await this.findCategoryService.execute(input);

    return createdCategory;
  }
}
