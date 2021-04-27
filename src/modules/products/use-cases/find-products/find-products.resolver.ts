import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindProductsDTO } from '../../dtos/find-products.dto';
import { FindProductsInput } from '../../inputs/find-products.input';
import { FindProductsService } from './find-products.service';

@Resolver()
export class FindProductsResolver {
  constructor(private findProductsService: FindProductsService) {}

  @Query(() => FindProductsDTO)
  async findProducts(@Args('input') input: FindProductsInput) {
    const products = await this.findProductsService.execute(input);

    return products;
  }
}
