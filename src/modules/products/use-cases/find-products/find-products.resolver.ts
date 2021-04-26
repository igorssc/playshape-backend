import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindProductsByStoreDTO } from '../../dtos/find-products-by-store.dto';
import { FindProductsInput } from '../../inputs/find-products.input';
import { FindProductsService } from './find-producs.service';

@Resolver()
export class FindProductsResolver {
  constructor(private findProductsService: FindProductsService) {}

  @Query(() => FindProductsByStoreDTO)
  async findProducts(@Args('input') input: FindProductsInput) {
    const products = await this.findProductsService.execute(input);

    return products;
  }
}
