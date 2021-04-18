import { Args, Query, Resolver } from '@nestjs/graphql';
import { ListCategoriesDTO } from '../../dtos/list-categories.dto';
import { ListCategoriesInput } from '../../inputs/list-categories.input';
import { ListCategoriesService } from './list-categories.service';

@Resolver()
export class ListCategoriesResolver {
  constructor(private listCategoriesService: ListCategoriesService) {}

  @Query(() => ListCategoriesDTO)
  async listAllCategories(
    @Args('input', { nullable: true }) input: ListCategoriesInput,
  ) {
    const categories = await this.listCategoriesService.execute(
      input ?? { page: 1, limit: 15 },
    );

    return categories;
  }
}
