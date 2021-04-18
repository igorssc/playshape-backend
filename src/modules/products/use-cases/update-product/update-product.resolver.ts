import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateProductDTO } from '../../dtos/update-product.dto';
import { UpdateProductInput } from '../../inputs/update-product.input';
import { UpdateProductService } from './update-product.service';

@Resolver()
export class UpdateProductResolver {
  constructor(private updateProductService: UpdateProductService) {}

  @Mutation(() => UpdateProductDTO)
  async updateProduct(@Args('input') input: UpdateProductInput) {
    const product = await this.updateProductService.execute(input);

    return product;
  }
}
