import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindStoreDTO } from '../../dtos/find-store.dto';
import { FindStoreInput } from '../../inputs/find-store.input';
import { FindStoreService } from './find-store.service';

@Resolver()
export class FindStoreResolver {
  constructor(private findStoreService: FindStoreService) {}

  @Query(() => FindStoreDTO)
  async findStore(@Args('input') input: FindStoreInput) {
    const store = await this.findStoreService.execute(input);

    return store;
  }
}
