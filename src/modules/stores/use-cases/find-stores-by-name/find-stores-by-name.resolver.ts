import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindStoresByNameDTO } from '../../dtos/find-stores-by-name.dto';
import { FindStoresByNameInput } from '../../inputs/find-stores-by-name.input';
import { FindStoresByNameService } from './find-stores-by-name.service';

@Resolver()
export class FindStoresByNameResolver {
  constructor(private findStoreByNameService: FindStoresByNameService) {}

  @Query(() => FindStoresByNameDTO)
  async findStoreByName(@Args('input') input: FindStoresByNameInput) {
    const stores = await this.findStoreByNameService.execute(input);

    return stores;
  }
}
