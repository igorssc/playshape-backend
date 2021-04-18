import { Args, Query, Resolver } from '@nestjs/graphql';
import { ListProductsDTO } from '../../dtos/list-products.dto';
import { ListProductsInput } from '../../inputs/list-products.input';
import { ListProductsService } from './list-products.service';

@Resolver()
export class ListProductsResolver {
  constructor(private listProductsService: ListProductsService) {}

  @Query(() => ListProductsDTO)
  async listProducts(
    @Args('input', { nullable: true }) input: ListProductsInput,
  ) {
    const products = await this.listProductsService.execute(
      input ?? { page: 1, limit: 15 },
    );

    return products;
  }
}
