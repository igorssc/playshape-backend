import { Args, Query, Resolver } from '@nestjs/graphql';
import { ListCategoriesDTO } from '../../dtos/list-categories.dto';
import { ListCategoriesInput } from '../../inputs/list-categories.input';
import { ListCategoriesService } from './list-categories.service';

@Resolver()
class ListCategoriesResolver {
  constructor(private listCategoriesService: ListCategoriesService) {}

  @Query(() => ListCategoriesDTO)
  async listAllCategories(@Args('input') input: ListCategoriesInput) {
    const categories = await this.listCategoriesService.execute(input);

    return categories;
  }
}

export { ListCategoriesResolver };
