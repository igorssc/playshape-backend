import { Args, Query, Resolver } from '@nestjs/graphql';
import { ListStoresDTO } from '../../dtos/list-stores.dto';
import { ListStoresInput } from '../../inputs/list-stores.input';
import { ListStoresService } from './list-stores.service';

@Resolver()
export class ListStoresResolver {
  constructor(private listStoresService: ListStoresService) {}

  @Query(() => ListStoresDTO)
  async listStores(@Args('input', { nullable: true }) input: ListStoresInput) {
    const stores = await this.listStoresService.execute(
      input ?? { page: 1, limit: 15 },
    );

    return stores;
  }
}
