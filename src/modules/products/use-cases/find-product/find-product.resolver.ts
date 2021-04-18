import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindProductDTO } from '../../dtos/find-product.dto';
import { FindProductInput } from '../../inputs/find-product.input';
import { FindProductService } from './find-product.service';

@Resolver()
export class FindProductResolver {
  constructor(private findProductService: FindProductService) {}

  @Query(() => FindProductDTO)
  async findProduct(@Args('input') input: FindProductInput) {
    const product = await this.findProductService.execute(input);

    return product;
  }
}
