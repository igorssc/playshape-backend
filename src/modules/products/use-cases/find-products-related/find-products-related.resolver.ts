import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindProductsRelatedDTO } from '../../dtos/find-products-related.dto';
import { FindProductsRelatedInput } from '../../inputs/find-products-related.input';
import { FindProductsRelatedService } from './find-products-related.service';

@Resolver()
export class FindProductsRelatedResolver {
  constructor(private findProductsRelatedService: FindProductsRelatedService) {}

  @Query(() => FindProductsRelatedDTO)
  async findProductsRelated(@Args('input') input: FindProductsRelatedInput) {
    const product = await this.findProductsRelatedService.execute(input);

    return product;
  }
}
