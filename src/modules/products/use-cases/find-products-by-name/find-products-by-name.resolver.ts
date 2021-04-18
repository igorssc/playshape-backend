import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindProductsByNameDTO } from '../../dtos/find-products-by-name.dto';
import { FindProductsByNameInput } from '../../inputs/find-products-by-name.input';
import { FindProductsByNameService } from './find-products-by-name.service';

@Resolver()
export class FindProductsByNameResolver {
  constructor(private findProductsByNameService: FindProductsByNameService) {}

  @Query(() => FindProductsByNameDTO)
  async findProductsByName(@Args('input') input: FindProductsByNameInput) {
    const products = await this.findProductsByNameService.execute(input);

    return products;
  }
}
