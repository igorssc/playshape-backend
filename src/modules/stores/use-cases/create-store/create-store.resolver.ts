import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateStoreDTO } from '../../dtos/create-store.dto';
import { CreateStoreInput } from '../../inputs/create-store.input';
import { CreateStoreService } from './create-store.service';

@Resolver()
export class CreateStoreResolver {
  constructor(private createStoreService: CreateStoreService) {}

  @Mutation(() => CreateStoreDTO)
  async createStore(@Args('input') input: CreateStoreInput) {
    const store = await this.createStoreService.execute(input);

    return store;
  }
}
