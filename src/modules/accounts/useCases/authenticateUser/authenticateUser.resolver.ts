import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListUserAuthenticatedDTO } from '../../dtos/list-user-authenticated.dto';
import { AuthenticateUserInput } from '../../inputs/authenticate-user.input';
import { AuthenticateUserService } from './authenticateUser.service';

@Resolver()
class AuthenticateUserResolver {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  @Query(() => ListUserAuthenticatedDTO)
  async authenticateUser(@Args('input') input: AuthenticateUserInput) {
    const userAuthenticated = await this.authenticateUserService.execute(input);

    return userAuthenticated;
  }
}

export { AuthenticateUserResolver };
