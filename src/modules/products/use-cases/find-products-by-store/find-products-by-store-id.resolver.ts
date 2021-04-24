import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindProductsByStoreDTO } from '../../dtos/find-products-by-store.dto';
import { FindProductsByStoreInput } from '../../inputs/find-products-by-store.input';
import { FindProductsByStoreIdService } from './find-products-by-store-id.service';

@Resolver()
export class FindProductsByStoreIdResolver {
  constructor(
    private findProductsByStoreIdService: FindProductsByStoreIdService,
  ) {}

  @Query(() => FindProductsByStoreDTO)
  async findProductsByStoreId(@Args('input') input: FindProductsByStoreInput) {
    const products = await this.findProductsByStoreIdService.execute(input);

    return products;
  }
}
