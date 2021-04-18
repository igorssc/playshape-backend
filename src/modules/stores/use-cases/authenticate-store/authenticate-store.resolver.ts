import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthenticateStoreDTO } from '../../dtos/authenticate-store.dto';
import { AuthenticateStoreInput } from '../../inputs/authenticate-store.input';
import { AuthenticateStoreService } from './authenticate-store.service';

@Resolver()
export class AuthenticateStoreResolver {
  constructor(private authenticateStoreService: AuthenticateStoreService) {}

  @Query(() => AuthenticateStoreDTO)
  async authenticateStore(@Args('input') input: AuthenticateStoreInput) {
    const store = await this.authenticateStoreService.execute(input);

    return store;
  }
}
