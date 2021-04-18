import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductDTO } from '../../dtos/create-product.dto';
import { CreateProductInput } from '../../inputs/create-product.input';
import { CreateProductService } from './create-product.service';

@Resolver()
export class CreateProductResolver {
  constructor(private createProductService: CreateProductService) {}

  @Mutation(() => CreateProductDTO)
  async createProduct(@Args('input') input: CreateProductInput) {
    const product = await this.createProductService.execute(input);

    return product;
  }
}
