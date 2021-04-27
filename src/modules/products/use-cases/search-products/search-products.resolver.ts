import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchProductsDTO } from '../../dtos/search-products.dto';
import { SearchProductsInput } from '../../inputs/search-products.input';
import { SearchProductsService } from './search-products.service';

@Resolver()
export class SearchProductsResolver {
  constructor(private searchProductsService: SearchProductsService) {}

  @Query(() => SearchProductsDTO)
  async searchProducts(@Args('input') input: SearchProductsInput) {
    const products = await this.searchProductsService.execute(input);

    return products;
  }
}
