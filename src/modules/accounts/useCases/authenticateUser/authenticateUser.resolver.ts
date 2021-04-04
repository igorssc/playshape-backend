import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListUserAuthenticatedDTO } from '../../dtos/list-user-authenticated.dto';
import { LoginUserInput } from '../../inputs/login-user.input';
import { AuthenticateUserService } from './authenticateUser.service';

@Resolver()
class AuthenticateUserResolver {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  @Query(() => ListUserAuthenticatedDTO)
  async authenticateUser(@Args('user') user: LoginUserInput) {
    const userAuthenticated = await this.authenticateUserService.execute(user);

    return userAuthenticated;
  }
}

export { AuthenticateUserResolver };
