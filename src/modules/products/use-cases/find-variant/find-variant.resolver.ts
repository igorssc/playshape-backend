import { Args, Resolver } from '@nestjs/graphql';
import { FindVariantDTO } from '../../dtos/find-variant.dto';
import { FindVariantInput } from '../../inputs/find-variant.input';
import { FindVariantService } from './find-variant.service';

@Resolver()
export class FindVariantResolver {
  constructor(private findVariantService: FindVariantService) {}

  async findVariant(
    @Args('input') input: FindVariantInput,
  ): Promise<FindVariantDTO> {
    const product = await this.findVariantService.execute(input);

    return product;
  }
}
